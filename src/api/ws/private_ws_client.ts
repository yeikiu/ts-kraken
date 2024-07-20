/* https://docs.kraken.com/api/docs/websocket-v2/status */

import WebSocketCtor from 'ws'
import { webSocket } from 'rxjs/webSocket'
import { Subject } from 'rxjs/internal/Subject'
import { filter, first, timeout } from 'rxjs/operators'
import { lastValueFrom, Observable } from 'rxjs'
import { getWsAuthToken } from '../rest/private/helpers'
import { Heartbeat, Status } from '$types/ws/public/channels'
import { ApiCredentials, ApiToken, PrivateRequest, PrivateResponse, PrivateSubscription, PrivateSubscriptionChannel, PrivateSubscriptionParams, PrivateSubscriptionUpdate } from '$types/ws/private'

export const onPrivateWsOpened = new Subject()
export const onPrivateWsClosed = new Subject()

const privateWsClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws-auth.kraken.com/v2',
    WebSocketCtor,
    openObserver: onPrivateWsOpened,
    closeObserver: onPrivateWsClosed
})

export const privateWsHeartbeat$: Observable<Heartbeat.Update> = privateWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'))
export const privateWsStatus$: Observable<Status.Update> = privateWsClient.pipe(filter(({ channel, type, data }) => data && type && channel === 'status'))

function isToken(tokenOrKeys: ApiToken | ApiCredentials): tokenOrKeys is ApiToken {
    return typeof tokenOrKeys === 'string'
}

export async function sendPrivateEvent<T extends PrivateRequest>(request: T, tokenOrKeys?: ApiToken | ApiCredentials): Promise<PrivateResponse<T>> {
    const token = isToken(tokenOrKeys) ? tokenOrKeys : await getWsAuthToken(tokenOrKeys)
    const { method } = request

    const [wsResponse] = await Promise.all([
        lastValueFrom(privateWsClient.pipe(
            filter(({ method: incomingMethod }) => incomingMethod === method),
            first(),
            timeout(10000) // Assume something went wrong if we didn't get a WS response within 10 seconds...
        )),
        privateWsClient.next({
            ...request,
            params: {
                ...request.params,
                token
            }
        })
    ])

    return wsResponse as PrivateResponse<T>;
}

export async function getPrivateSubscription<C extends PrivateSubscriptionChannel>({
    channel, params, req_id
}: {
    channel: C, req_id?: PrivateSubscription<C>['req_id']
} & PrivateSubscriptionParams<C>, tokenOrKeys?: ApiToken | ApiCredentials): Promise<Observable<PrivateSubscriptionUpdate<C>>> {

    const token = isToken(tokenOrKeys) ? tokenOrKeys : await getWsAuthToken(tokenOrKeys)

    const openSub = {
        method: 'subscribe',
        req_id,
        params: {
            ...params,
            channel,
            token
        }
    } as const;

    const closeSub = {
        method: 'unsubscribe',
        req_id,
        params: {
            ...params,
            channel,
            token
        }
    } as const;

    return privateWsClient.multiplex(
        () => (openSub),
        () => (closeSub),
        ({ channel: wsChannel }): boolean => channel === wsChannel
    ) as Observable<PrivateSubscriptionUpdate<C>>;
}
