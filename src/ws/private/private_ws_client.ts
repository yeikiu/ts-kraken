import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter, first, timeout } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { gethWsAuthToken } from '../..'

import type { PrivateWS } from '../../types'

export const onPrivateWSOpened = new Subject()
export const onPrivateWSClosed = new Subject()

export const privateWSClient = webSocket({
  protocol: 'v1',
  url: 'wss://ws-auth.kraken.com/',
  WebSocketCtor,
  openObserver: onPrivateWSOpened,
  closeObserver: onPrivateWSClosed
})

export const WSPrivateHeartbeat$ = privateWSClient.pipe(filter(({ event = null }) => event && event === 'heartbeat'))

export function getPrivateSubscription(params: PrivateWS.Channels.ownTrades.Subscription, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<Observable<PrivateWS.Channels.ownTrades.Payload>>
export function getPrivateSubscription(params: PrivateWS.Channels.openOrders.Subscription, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<Observable<PrivateWS.Channels.openOrders.Payload>>

/**
 * Returns a rxjs-Observable connected to passed PRIVATE-WS channelName. You can (un)subscribe from this Observable just like with any rxjs's.
 *
 * @param params - Subscription
 * @param tokenOrKeys - <OPTIONAL> { wsToken: string } | { apiKey, apiSecret }
 *      - If not passed, process.env keys will be used to generate a token
 *      - If a wsToken is passed it'll be used directly (optimal performance)
 *      - Finally, if injectedApiKeys are passed, a new token will be generated on-the-fly
 * @returns Observable<Payload>
 */
export async function getPrivateSubscription(params: PrivateWS.Subscription, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<Observable<unknown>> {
  const token = tokenOrKeys?.wsToken ?? await gethWsAuthToken({ ...tokenOrKeys })
    
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

export async function sendPrivateEvent(payload: PrivateWS.SendEvents.addOrder.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<PrivateWS.SendEvents.addOrder.EventResponse>
export async function sendPrivateEvent(payload: PrivateWS.SendEvents.cancelOrder.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<PrivateWS.SendEvents.cancelOrder.EventResponse>
export async function sendPrivateEvent(payload: PrivateWS.SendEvents.cancelAll.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<PrivateWS.SendEvents.cancelAll.EventResponse>
export async function sendPrivateEvent(payload: PrivateWS.SendEvents.cancelAllOrdersAfter.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<PrivateWS.SendEvents.cancelAllOrdersAfter.EventResponse>

/**
 * Sends a PRIVATE-WS event as a Promise
 *
 * @param payload - SendEvent
 * @param tokenOrKeys - <OPTIONAL> { wsToken, injectedApiKeys }
 *      - If not passed, process.env keys will be used to generate a token.
 *      - If a wsToken is passed it'll be used directly (optimal performance).
 *      - Finally, if injectedApiKeys are passed, a new token will be generated on-the-fly.
 * @returns Promise<EventResponse>
 */
export async function sendPrivateEvent(payload: PrivateWS.SendEvent, tokenOrKeys?: PrivateWS.TokenOrKeys): Promise<PrivateWS.EventResponse> {
  const token = tokenOrKeys?.wsToken ?? await gethWsAuthToken({ ...tokenOrKeys })
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
