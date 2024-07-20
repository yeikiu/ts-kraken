/* https://docs.kraken.com/api/docs/websocket-v2/status */

import { filter, first, timeout } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { webSocket } from 'rxjs/webSocket';
import WebSocketCtor from 'ws';
import { PublicRequest, PublicResponse, PublicSubscription, PublicSubscriptionChannel, PublicSubscriptionParams, PublicSubscriptionUpdate } from '$types/ws/public';
import { Heartbeat, Status } from '$types/ws/public/channels';

export const onPublicWsOpen = new Subject();
export const onPublicWsClose = new Subject();

const publicWsClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws.kraken.com/v2',
    WebSocketCtor,
    openObserver: onPublicWsOpen,
    closeObserver: onPublicWsClose
});

export const publicWsHeartbeat$: Observable<Heartbeat.Update> = publicWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'));
export const publicWsStatus$: Observable<Status.Update> = publicWsClient.pipe(filter(({ channel, type, data }) => data && type && channel === 'status'));

export async function sendPublicEvent<T extends PublicRequest>(request: T): Promise<PublicResponse<T>> {
    const { req_id } = request;

    const [wsResponse] = await Promise.all([
        lastValueFrom(publicWsClient.pipe(
            filter(({ req_id: incomingReq_id }) => incomingReq_id === req_id),
            first(),
            timeout(10000) // Assume something went wrong if we didn't get a WS response within 10 seconds...
        )),
        publicWsClient.next(request)
    ]);

    return wsResponse as PublicResponse<T>;
}

export function getPublicSubscription<C extends PublicSubscriptionChannel>({
    channel, params, req_id
}:{
  channel: C, req_id?: PublicSubscription<C>['req_id']
} & PublicSubscriptionParams<C>) : Observable<PublicSubscriptionUpdate<C>> {
  
    const openSub = {
        method: 'subscribe',
        req_id,
        params: {
            ...params,
            channel
        }
    } as const;

    const closeSub = {
        method: 'unsubscribe',
        req_id,
        params: {
            ...params,
            channel
        }
    } as const;

    return publicWsClient.multiplex(
        () => (openSub),
        () => (closeSub),
        ({ channel: wsChannel }): boolean => channel === wsChannel
    ) as Observable<PublicSubscriptionUpdate<C>>;
}
