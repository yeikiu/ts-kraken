import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { privateRESTRequest } from '../../rest/private/private_rest_request'
import { OpenOrders, OwnTrades, PrivateWS } from '../../types/ws/private'
import { PrivateREST } from '../../types/rest/private'
import { Observable } from 'rxjs'

export const onPrivateWSOpened = new Subject()
export const onPrivateWSClosed = new Subject()

export const privateWSClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws-auth.kraken.com/',
    WebSocketCtor,
    openObserver: onPrivateWSOpened,
    closeObserver: onPrivateWSClosed
})

export const gethWsAuthToken = async (injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<string> => {
    try {
        const { token } = await privateRESTRequest({ url: 'GetWebSocketsToken' }, injectedApiKeys) || {}
        if (!token) {
            throw ({ code: 'CUSTOM_ERROR', message: 'no token received' })
        }
        return token
        
    } catch({ code, message }) {
        console.error('Kraken gethWsAuthToken error', { code, message })
        throw ({ code, message })
    }
}

export const WSPrivateHeartbeat$ = privateWSClient.pipe(filter(({ event = null }) => event && event === 'heartbeat'))

export function privateSubscriptionHandler(params: OwnTrades.Subscription, { injectedApiKeys, wsToken }?: PrivateWS.KeysOrToken): Promise<Observable<OwnTrades.Payload>>
export function privateSubscriptionHandler(params: OpenOrders.Subscription, { injectedApiKeys, wsToken }?: PrivateWS.KeysOrToken): Promise<Observable<OpenOrders.Payload>>
export async function privateSubscriptionHandler(params: PrivateWS.Subscription, { injectedApiKeys, wsToken }: PrivateWS.KeysOrToken = {}): Promise<Observable<PrivateWS.Payload>> {
    const token = wsToken ?? await gethWsAuthToken(injectedApiKeys)
    
    return privateWSClient.multiplex(() => ({
        event: 'subscribe',
        subscription: {
            token,
            name: params.channelName,
            ...params['snapshot'] ? { snapshot: params['snapshot'] } : {},
            ...params['ratecounter'] ? { ratecounter: params['ratecounter'] } : {},
        },
    
    }), () => ({
        event: 'unsubscribe',
        subscription: {
            token,
            name: params.channelName,
        },
    }), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(params.channelName)))
}