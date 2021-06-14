import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter, first, timeout } from 'rxjs/operators'
import { privateRESTRequest } from '../../rest/private/private_rest_request'
import { OpenOrders, OwnTrades, PrivateWS } from '../../types/ws/private'
import { PrivateREST } from '../../types/rest/private'
import { Observable } from 'rxjs'
import { AddOrder } from '../../types/ws/private/send_events/addOrder'
import { CancelOrder } from '../../types/ws/private/send_events/cancelOrder'
import { CancelAll } from '../../types/ws/private/send_events/cancelAll'
import { CancelAllOrdersAfter } from '../../types/ws/private/send_events/cancelAllOrdersAfter'

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

export function getPrivateSubscription(params: OwnTrades.Subscription, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<Observable<OwnTrades.Payload>>
export function getPrivateSubscription(params: OpenOrders.Subscription, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<Observable<OpenOrders.Payload>>

/**
 * Returns a rxjs-Observable connected to passed PRIVATE-WS channelName. You can (un)subscribe from this Observable just like with any rxjs's.
 *
 * @param params - PrivateWS.Subscription
 * @param tokenOrKeys - <OPTIONAL> { wsToken, injectedApiKeys }
 *      - If not passed, process.env keys will be used to generate a token.
 *      - If a wsToken is passed it'll be used directly (optimal performance).
 *      - Finally, if injectedApiKeys are passed, a new token will be generated on-the-fly.
 * @returns Observable<PrivateWS.Payload>
 */
export async function getPrivateSubscription(params: PrivateWS.Subscription, { wsToken, injectedApiKeys }: PrivateWS.TokenOrKeys = {}): Promise<Observable<PrivateWS.Payload>> {
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

export async function sendPrivateEvent(payload: AddOrder.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<AddOrder.EventResponse>
export async function sendPrivateEvent(payload: CancelOrder.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<CancelOrder.EventResponse>
export async function sendPrivateEvent(payload: CancelAll.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<CancelAll.EventResponse>
export async function sendPrivateEvent(payload: CancelAllOrdersAfter.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<CancelAllOrdersAfter.EventResponse>

/**
 * Sends a PRIVATE-WS event as a Promise
 *
 * @param payload - PrivateWS.SendEvent
 * @param tokenOrKeys - <OPTIONAL> { wsToken, injectedApiKeys }
 *      - If not passed, process.env keys will be used to generate a token.
 *      - If a wsToken is passed it'll be used directly (optimal performance).
 *      - Finally, if injectedApiKeys are passed, a new token will be generated on-the-fly.
 * @returns Promise<PrivateWS.EventResponse>
 */
export async function sendPrivateEvent(payload: PrivateWS.SendEvent, { wsToken, injectedApiKeys }: PrivateWS.TokenOrKeys = {}): Promise<PrivateWS.EventResponse> {
    const token = wsToken ?? await gethWsAuthToken(injectedApiKeys)
    const { reqid: sendReqId, event: sendEvent } = payload
    
    const [rawResponse] = await Promise.all([
        privateWSClient.pipe(
            filter(sendReqId ? ({ reqid }) => reqid === sendReqId : ({ event }) => event === `${sendEvent}Status`),
            first(),
            timeout(10000) // Assume something went wrong if we didn't get a WS response within 10 seconds...
        ).toPromise(),
        privateWSClient.next({
            ...payload,
            token
        })
    ])

    const eventResponse = rawResponse as PrivateWS.EventResponse
    
    if (eventResponse.status === 'error') {
        throw new Error(JSON.stringify(eventResponse)) 
    }
    return eventResponse
}
