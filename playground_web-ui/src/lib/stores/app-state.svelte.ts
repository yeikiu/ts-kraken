import type { ApiCredentials, TerminalLog } from '../../types/ui-types';
import { isBrowser } from '../../util/is_browser';
import { krakenClient } from '../kraken-client';

// Asset pairs data state
class AssetPairsState {
  pairs = $state<string[]>([]);
  loading = $state(false);
  loaded = $state(false);

  // Mapping from user-friendly wsname (e.g., "BTC/USD") to API pair key (e.g., "XXBTZUSD")
  // This is shared with the singleton KrakenClient for automatic normalization
  pairMapping = $state<Map<string, string>>(new Map());

  async fetchPairs() {
    if (this.loaded || this.loading) return;

    this.loading = true;
    try {
      const result = await krakenClient.publicRest('AssetPairs', {});

      // Extract WebSocket names from the result (wsname field has the / separator format)
      // and create mapping between wsname and pair key for API requests
      if (result && typeof result === 'object') {
        const wsNames = new Set<string>();
        const mapping = new Map<string, string>();

        for (const [pairKey, pairInfo] of Object.entries(result)) {
          if (pairInfo && typeof pairInfo === 'object' && 'wsname' in pairInfo) {
            const wsname = pairInfo.wsname as string;
            wsNames.add(wsname);
            // Map wsname to the pair key for later lookup
            mapping.set(wsname, pairKey);
          }
        }

        this.pairs = Array.from(wsNames).sort();
        this.pairMapping = mapping;
        this.loaded = true;

        // Share the mapping with the singleton KrakenClient for automatic REST API normalization
        krakenClient.setPairMapping(mapping);
      }
    } catch (error) {
      console.error('Failed to fetch asset pairs:', error);
    } finally {
      this.loading = false;
    }
  }
}

// Assets data state
class AssetsState {
  assets = $state<string[]>([]);
  loading = $state(false);
  loaded = $state(false);

  async fetchAssets() {
    if (this.loaded || this.loading) return;

    this.loading = true;
    try {
      const result = await krakenClient.publicRest('Assets');

      // Extract asset names from the result
      if (result && typeof result === 'object') {
        this.assets = Object.keys(result).sort();
        this.loaded = true;
      }
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    } finally {
      this.loading = false;
    }
  }
}

// Terminal logs state
class TerminalState {
  logs = $state<TerminalLog[]>([]);

  addLog(level: TerminalLog['level'], message: string, data?: unknown) {
    this.logs.push({
      id: crypto.randomUUID(),
      timestamp: new Date(),
      level,
      message,
      data
    });
  }

  clear() {
    this.logs = [];
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Authentication state
class AuthState {
  credentials = $state<ApiCredentials | null>(null);

  constructor() {
    // Load from sessionStorage on init
    if (isBrowser()) {
      const stored = sessionStorage.getItem('kraken_credentials');
      if (stored) {
        try {
          this.credentials = JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored credentials', e);
        }
      }
    }
  }

  setCredentials(apiKey: string, apiSecret: string) {
    this.credentials = { apiKey, apiSecret };
    if (isBrowser()) {
      sessionStorage.setItem('kraken_credentials', JSON.stringify(this.credentials));
    }
  }

  clearCredentials() {
    this.credentials = null;
    if (isBrowser()) {
      sessionStorage.removeItem('kraken_credentials');
    }
  }

  get isAuthenticated() {
    return this.credentials !== null &&
           this.credentials.apiKey.length > 0 &&
           this.credentials.apiSecret.length > 0;
  }
}

// Selected method state
class MethodState {
  selectedMethod = $state<string | null>(null);
  selectedMethodType = $state<string | null>(null);
  formData = $state<Record<string, unknown>>({});

  setMethod(methodName: string, methodType: string) {
    this.selectedMethod = methodName;
    this.selectedMethodType = methodType;
    this.formData = {};
  }

  updateFormField(field: string, value: unknown) {
    this.formData[field] = value;
  }

  clearForm() {
    this.formData = {};
  }

  get selectedMethodKey() {
    return this.selectedMethod && this.selectedMethodType
      ? `${this.selectedMethodType}:${this.selectedMethod}`
      : null;
  }
}

// WebSocket state
class WebSocketState {
  activeSubscriptions = $state<import('../../types/ui-types').WebSocketSubscription[]>([]);

  addSubscription(subscription: import('../../types/ui-types').WebSocketSubscription) {
    this.activeSubscriptions = [...this.activeSubscriptions, subscription];
  }

  removeSubscription(id: string) {
    const sub = this.activeSubscriptions.find(s => s.id === id);
    if (sub?.subscription) {
      // Unsubscribe from RxJS subscription
      sub.subscription.unsubscribe();
    }
    this.activeSubscriptions = this.activeSubscriptions.filter(s => s.id !== id);
  }

  getActiveSubscription(methodName: string): import('../../types/ui-types').WebSocketSubscription | undefined {
    return this.activeSubscriptions.find(sub => sub.methodName === methodName);
  }

  clearAll() {
    // Unsubscribe from all active subscriptions
    for (const sub of this.activeSubscriptions) {
      if (sub.subscription) {
        sub.subscription.unsubscribe();
      }
    }
    this.activeSubscriptions = [];
  }
}

// Export singleton instances
export const assetPairsState = new AssetPairsState();
export const assetsState = new AssetsState();
export const terminalState = new TerminalState();
export const authState = new AuthState();
export const methodState = new MethodState();
export const wsState = new WebSocketState();
