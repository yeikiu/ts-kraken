import {
  publicRestRequest,
  privateRestRequest,
  publicWsSubscription,
  privateWsSubscription,
  privateWsRequest,
  publicWsRequest,
  publicWsHeartbeat$,
  privateWsHeartbeat$,
  publicWsStatus$,
} from 'ts-kraken';
import type {
  PublicRestTypes,
  PrivateRestTypes,
  PublicWsTypes,
  PrivateWsTypes
} from 'ts-kraken';

import type { ApiCredentials } from '../types/ui-types';
import { first } from 'rxjs/operators';
import type { Subscription } from 'rxjs';
import { normalizePair } from './utils/pair-normalizer';

/**
 * Browser-compatible wrapper for ts-kraken API
 * Now uses the updated ts-kraken library which supports browser environments
 * Automatically normalizes asset pair parameters for REST API requests
 *
 * Use the singleton instance: import { krakenClient } from './kraken-client'
 */
export class KrakenClient {
  private credentials: ApiCredentials | null = null;
  private pairMapping: Map<string, string> = new Map();

  constructor(credentials?: ApiCredentials) {
    this.credentials = credentials || null;
  }

  /**
   * Set the pair mapping from AssetPairs API response
   * This allows accurate conversion from wsname (e.g., "BTC/USD") to API key (e.g., "XXBTZUSD")
   */
  setPairMapping(mapping: Map<string, string>) {
    this.pairMapping = mapping;
  }

  /**
   * Normalizes pair parameters in REST API request params
   * Automatically detects and converts pair-related parameters
   * Only applies to REST API requests, not WebSocket
   *
   * Priority:
   * 1. Look up in AssetPairs mapping (source of truth from API)
   * 2. If not found, apply legacy transformations (BTC->XXBT, USD->ZUSD, etc.)
   * 3. Remove slash for API format
   */
  private normalizePairsInParams<T extends Record<string, unknown>>(params: T): T {
    if (!params) return params;

    const normalized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(params)) {
      // Check if this is a pair-related parameter
      if ((key === 'pair' || key === 'symbol' || key.includes('pair')) && typeof value === 'string') {
        // Check if it's a comma-separated list
        if (value.includes(',')) {
          // Multiple pairs
          normalized[key] = value
            .split(',')
            .map(pair => {
              const trimmed = pair.trim().toUpperCase();

              // PRIORITY 1: Check mapping from AssetPairs API first (source of truth)
              const apiKey = this.pairMapping.get(trimmed);
              if (apiKey) return apiKey;

              // PRIORITY 2: Apply legacy transformations if not in mapping
              const normalizedPair = normalizePair(trimmed);

              // Try mapping again with normalized form
              const apiKeyNormalized = this.pairMapping.get(normalizedPair);
              if (apiKeyNormalized) return apiKeyNormalized;

              // PRIORITY 3: Remove slash for API format
              return normalizedPair.replace('/', '');
            })
            .join(',');
        } else {
          // Single pair
          const trimmed = value.trim().toUpperCase();

          // PRIORITY 1: Check mapping from AssetPairs API first (source of truth)
          const apiKey = this.pairMapping.get(trimmed);
          if (apiKey) {
            normalized[key] = apiKey;
          } else {
            // PRIORITY 2: Apply legacy transformations if not in mapping
            const normalizedPair = normalizePair(trimmed);

            // Try mapping again with normalized form
            const apiKeyNormalized = this.pairMapping.get(normalizedPair);
            if (apiKeyNormalized) {
              normalized[key] = apiKeyNormalized;
            } else {
              // PRIORITY 3: Remove slash for API format
              normalized[key] = normalizedPair.replace('/', '');
            }
          }
        }
      } else {
        // Not a pair parameter, keep as-is
        normalized[key] = value;
      }
    }

    return normalized as T;
  }

  setCredentials(credentials: ApiCredentials) {
    this.credentials = credentials;
  }

  /**
   * Execute a public REST API request using ts-kraken
   * Automatically normalizes pair parameters before sending
   */
  async publicRest<E extends PublicRestTypes.PublicRestEndpoint>(
    endpoint: E,
    params?: PublicRestTypes.PublicRestParams<E>
  ): Promise<PublicRestTypes.PublicRestResult<E>> {
    // Normalize pair parameters if present
    const normalizedParams = params ? this.normalizePairsInParams(params as Record<string, unknown>) : params;

    const result = await publicRestRequest({
      url: endpoint,
      params: normalizedParams
    } as PublicRestTypes.PublicRestRequest<E>);
    return result;
  }

  /**
   * Execute a private REST API request using ts-kraken
   * Automatically normalizes pair parameters before sending
   */
  async privateRest<E extends PrivateRestTypes.PrivateRestEndpoint>(
    endpoint: E,
    data?: PrivateRestTypes.PrivateRestParams<E>
  ): Promise<PrivateRestTypes.PrivateRestResult<E>> {
    if (!this.credentials) {
      throw new Error('API credentials not set. Please configure your API key and secret.');
    }

    // Normalize pair parameters if present
    const normalizedData = data ? this.normalizePairsInParams(data as Record<string, unknown>) : data;

    const result = await privateRestRequest(
      {
        url: endpoint,
        data: normalizedData
      } as PrivateRestTypes.PrivateRestRequest<E>,
      {
        apiKey: this.credentials.apiKey,
        apiSecret: this.credentials.apiSecret
      }
    );
    return result;
  }

  /**
   * Subscribe to a public WebSocket channel and get a snapshot (auto-closes after first message)
   */
  async snapshotPublic<T extends PublicWsTypes.PublicSubscriptionChannel>(
    channel: T,
    params?: Record<string, unknown>
  ): Promise<PublicWsTypes.PublicSubscriptionUpdate<T>> {
    const subscription = publicWsSubscription({
      channel,
      params
    } as Parameters<typeof publicWsSubscription>[0]);

    return new Promise((resolve, reject) => {
      const sub = subscription.subscribe({
        next: (data) => {
          resolve(data as PublicWsTypes.PublicSubscriptionUpdate<T>);
          sub.unsubscribe();
        },
        error: (err) => reject(err)
      });
    });
  }

  /**
   * Subscribe to a public WebSocket channel and listen continuously
   */
  listenPublic<T extends PublicWsTypes.PublicSubscriptionChannel>(
    channel: T,
    params: Record<string, unknown>,
    onMessage: (data: PublicWsTypes.PublicSubscriptionUpdate<T>) => void,
    onError?: (error: Error) => void
  ): Subscription {
    const subscription = publicWsSubscription({
      channel,
      params
    } as Parameters<typeof publicWsSubscription>[0]);

    return subscription.subscribe({
      next: onMessage as (value: unknown) => void,
      error: onError || ((err) => console.error('WebSocket error:', err)),
      complete: () => console.log('WebSocket subscription completed')
    }) as unknown as Subscription;
  }

  /**
   * Subscribe to a private WebSocket channel and get a snapshot (auto-closes after first message)
   */
  async snapshotPrivate<T extends PrivateWsTypes.PrivateSubscriptionChannel>(
    channel: T,
    params?: Record<string, unknown>
  ): Promise<PrivateWsTypes.PrivateSubscriptionUpdate<T>> {
    if (!this.credentials) {
      throw new Error('API credentials required for private WebSocket channels');
    }

    const observable = await privateWsSubscription({
      channel,
      params
    } as Parameters<typeof privateWsSubscription>[0], this.credentials);

    return new Promise((resolve, reject) => {
      const sub = observable.subscribe({
        next: (data) => {
          resolve(data as PrivateWsTypes.PrivateSubscriptionUpdate<T>);
          sub.unsubscribe();
        },
        error: (err) => reject(err)
      });
    });
  }

  /**
   * Subscribe to a private WebSocket channel and listen continuously
   */
  async listenPrivate<T extends PrivateWsTypes.PrivateSubscriptionChannel>(
    channel: T,
    params: Record<string, unknown>,
    onMessage: (data: PrivateWsTypes.PrivateSubscriptionUpdate<T>) => void,
    onError?: (error: Error) => void
  ): Promise<Subscription> {
    if (!this.credentials) {
      throw new Error('API credentials required for private WebSocket channels');
    }

    const observable = await privateWsSubscription({
      channel,
      params
    } as Parameters<typeof privateWsSubscription>[0], this.credentials);

    return observable.subscribe({
      next: onMessage as (value: unknown) => void,
      error: onError || ((err) => console.error('WebSocket error:', err)),
      complete: () => console.log('WebSocket subscription completed')
    }) as unknown as Subscription;
  }

  /**
   * Execute a private WebSocket action request (one-time, not a subscription)
   */
  async privateWsAction<T extends PrivateWsTypes.PrivateWsRequest>(
    request: T
  ): Promise<PrivateWsTypes.PrivateWsResponse<T>> {
    if (!this.credentials) {
      throw new Error('API credentials required for private WebSocket actions');
    }

    const result = await privateWsRequest(request, this.credentials);

    return result as PrivateWsTypes.PrivateWsResponse<T>;
  }

  /**
   * Execute a public WebSocket action request (one-time, not a subscription)
   * Example: ping
   */
  async publicWsAction(method: 'ping', req_id?: number): Promise<any> {
    const result = await publicWsRequest({ method, req_id });
    return result;
  }

  /**
   * Listen to public WebSocket heartbeat messages
   * Heartbeats are sent ~1/sec when any public subscription is active
   */
  listenPublicHeartbeat(
    onHeartbeat: (data: { channel: 'heartbeat' }) => void,
    onError?: (error: Error) => void
  ): Subscription {
    return publicWsHeartbeat$.subscribe({
      next: onHeartbeat as (value: unknown) => void,
      error: onError || ((err) => console.error('Public heartbeat error:', err)),
      complete: () => console.log('Public heartbeat listener completed')
    }) as unknown as Subscription;
  }

  /**
   * Listen to private WebSocket heartbeat messages
   * Heartbeats are sent ~1/sec when any private subscription is active
   */
  listenPrivateHeartbeat(
    onHeartbeat: (data: { channel: 'heartbeat' }) => void,
    onError?: (error: Error) => void
  ): Subscription {
    return privateWsHeartbeat$.subscribe({
      next: onHeartbeat as (value: unknown) => void,
      error: onError || ((err) => console.error('Private heartbeat error:', err)),
      complete: () => console.log('Private heartbeat listener completed')
    }) as unknown as Subscription;
  }

  /**
   * Listen to public WebSocket status messages
   * Status messages provide exchange status and connection verification
   */
  listenPublicStatus(
    onStatus: (data: any) => void,
    onError?: (error: Error) => void
  ): Subscription {
    return publicWsStatus$.subscribe({
      next: onStatus as (value: unknown) => void,
      error: onError || ((err) => console.error('Public status error:', err)),
      complete: () => console.log('Public status listener completed')
    }) as unknown as Subscription;
  }
}

/**
 * Singleton KrakenClient instance for the entire application
 * Use this instead of creating new instances
 */
export const krakenClient = new KrakenClient();
