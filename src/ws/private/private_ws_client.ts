import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { privateRESTRequest } from '../../rest/private/private_rest_request'
import { PrivateWS } from '../../types/ws/private'
import { PrivateREST } from '../../types/rest/private'

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

export async function privateSubscriptionHandler({ channelName, ratecounter = null, snapshot = null }: PrivateWS.Subscription, injectedApiKeys?: PrivateREST.RuntimeApiKeys) {
    const token = await gethWsAuthToken(injectedApiKeys)
    return privateWSClient.multiplex(() => ({
        event: 'subscribe',
        subscription: {
            token,
            name: channelName,
            ...snapshot ? { snapshot } : {},
            ...ratecounter ? { ratecounter } : {},
        },
    
    }), () => ({
        event: 'unsubscribe',
        subscription: {
            token,
            name: channelName,
        },
    
    }), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(channelName)))
}
