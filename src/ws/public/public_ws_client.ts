import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { Book, OHLC, PublicWS, Spread, Ticker, Trade } from '../../types/ws/public'
import { Observable } from 'rxjs'

export const onPublicWSOpened = new Subject()
export const onPublicWSClosed = new Subject()

export const publicWSClient = webSocket<unknown>({
    protocol: 'v1',
    url: 'wss://ws.kraken.com',
    WebSocketCtor,
    openObserver: onPublicWSOpened,
    closeObserver: onPublicWSClosed
})

export const WSPublicHeartbeat$ = publicWSClient.pipe(filter(({ event = null }) => event && event === 'heartbeat'))

export function getPublicSubscription(params: Book.Subscription): Observable<Book.Payload>
export function getPublicSubscription(params: OHLC.Subscription): Observable<OHLC.Payload>
export function getPublicSubscription(params: Spread.Subscription): Observable<Spread.Payload>
export function getPublicSubscription(params: Ticker.Subscription): Observable<Ticker.Payload>
export function getPublicSubscription(params: Trade.Subscription): Observable<Trade.Payload>

/**
 * Returns a rxjs-Observable connected to passed PUBLIC-WS channelName. You can (un)subscribe from this Observable just like with any rxjs's.
 *
 * @param params - PublicWS.Subscription - { channelName; pair; ... }
 * @returns Observable<PublicWS.Payload>
 */
export function getPublicSubscription(params: PublicWS.Subscription): Observable<PublicWS.Payload> {
    return publicWSClient.multiplex(() => ({
        event: 'subscribe',
        ...params['pair'] ? { pair: params['pair'] } : {},
        subscription: {
            name: params.channelName,
            ...params['interval'] ? { interval: Number(params['interval']) } : {},
            ...params['depth'] ? { depth: Number(params['depth']) } : {},
        },

    }), () => ({
        event: 'unsubscribe',
        ...params['pair'] ? { pair: params['pair'] } : {},
        subscription: {
            name: params.channelName,
        },
    }), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(params.channelName)))
}
