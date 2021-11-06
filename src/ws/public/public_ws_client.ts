import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import type { PublicWS } from '../../types'

export const onPublicWSOpened = new Subject()
export const onPublicWSClosed = new Subject()

export const publicWSClient = webSocket<unknown>({
  protocol: 'v1',
  url: 'wss://ws.kraken.com',
  WebSocketCtor,
  openObserver: onPublicWSOpened,
  closeObserver: onPublicWSClosed
})

export const WSPublicHeartbeat$ = publicWSClient.pipe(filter(({ event = null }) => event === 'heartbeat'))

export function getPublicSubscription (params: PublicWS.Channels.book.Subscription): Observable<PublicWS.Channels.book.Payload>
export function getPublicSubscription (params: PublicWS.Channels.ohlc.Subscription): Observable<PublicWS.Channels.ohlc.Payload>
export function getPublicSubscription (params: PublicWS.Channels.spread.Subscription): Observable<PublicWS.Channels.spread.Payload>
export function getPublicSubscription (params: PublicWS.Channels.ticker.Subscription): Observable<PublicWS.Channels.ticker.Payload>
export function getPublicSubscription (params: PublicWS.Channels.trade.Subscription): Observable<PublicWS.Channels.trade.Payload>

/**
 * Returns a rxjs-Observable connected to passed PUBLIC-WS channelName. You can (un)subscribe from this Observable just like with any rxjs's.
 *
 * @param params - PublicWS.Subscription - { channelName; pair; ... }
 * @returns Observable<PublicWS.Payload>
 */
export function getPublicSubscription (params: PublicWS.Subscription): Observable<unknown> {
  return publicWSClient.multiplex(() => ({
    event: 'subscribe',
    ...params['pair'] ? { pair: params['pair'] } : {},
    subscription: {
      name: params.channelName,
      ...params['interval'] ? { interval: Number(params['interval']) } : {},
      ...params['depth'] ? { depth: Number(params['depth']) } : {},
    }

  }), () => ({
    event: 'unsubscribe',
    ...params['pair'] ? { pair: params['pair'] } : {},
    subscription: {
      name: params.channelName
    }
  }), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(params.channelName)))
}
