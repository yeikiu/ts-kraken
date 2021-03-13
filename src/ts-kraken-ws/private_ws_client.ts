import * as WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'
import { privateRESTRequest } from '../ts-kraken-rest/private_rest_request'
import debugHelper from '../util/debug_helper'
import { InjectedApiKeys } from '../types/injected_api_keys'

const { logError } = debugHelper(__filename)

export const onPrivateWSOpened = new Subject()
export const onPrivateWSClosed = new Subject()

export const privateWSClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws-auth.kraken.com/',
    WebSocketCtor,
    openObserver: onPrivateWSOpened,
    closeObserver: onPrivateWSClosed
})

export const gethWsAuthToken = async (injectedApiKeys?: InjectedApiKeys): Promise<string> => {
    try {
        const { token } = await privateRESTRequest({ url: 'GetWebSocketsToken' }, injectedApiKeys) || {}
        if (!token) {
            throw ({ code: 'CUSTOM_ERROR', message: 'no token received' })
        }
        return token
        
    } catch({ code, message }) {
        logError('Kraken gethWsAuthToken error', { code, message })
        throw ({ code, message })
    }
}

export const WSPrivateHeartbeat$ = privateWSClient.pipe(filter(({ event = null }) => event && event === 'heartbeat'))
