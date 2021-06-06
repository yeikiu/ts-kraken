import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'

export const onPublicWSOpened = new Subject()
export const onPublicWSClosed = new Subject()

export const publicWSClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws.kraken.com',
    WebSocketCtor,
    openObserver: onPublicWSOpened,
    closeObserver: onPublicWSClosed
})

export const WSPublicHeartbeat$ = publicWSClient.pipe(filter(({ event = null }) => event && event === 'heartbeat'))
