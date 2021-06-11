import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { PublicWS } from '../../types/ws/public'

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


export const publicSubscriptionHandler = ({ channelName, pair, interval, depth }: PublicWS.Subscription) => publicWSClient.multiplex(() => ({

    event: 'subscribe',
    ...pair ? { pair } : {},
    subscription: {
        name: channelName,
        ...interval ? { interval: Number(interval) } : {},
        ...depth ? { depth: Number(depth) } : {},
    },

}), () => ({

    event: 'unsubscribe',
    ...pair ? { pair } : {},
    subscription: {
        name: channelName,
    },

}), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(channelName)))
