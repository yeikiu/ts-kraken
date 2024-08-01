/* https://docs.kraken.com/api/docs/websocket-v2/status */

import { filter, first, timeout } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { webSocket } from 'rxjs/webSocket';
import WebSocketCtor from 'ws';
import { PublicSubscription, PublicSubscriptionChannel, PublicSubscriptionParams, PublicSubscriptionUpdate, PublicWsRequest, PublicWsResponse } from '../../../types/ws/public';
import { Heartbeat, Status } from '../../../types/ws';

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicWs.connected$.subscribe(() => {
        console.log('Public WebsocketV2 connected successfully!\n');
    });
* ```
*/
export const connected$ = new Subject();

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicWs.disconnected$.subscribe(() => {
        console.log('Public WebsocketV2 connection closed!\n');
        
        // Code to handle connection lost here...
    });
* ```
*/
export const disconnected$ = new Subject();

const publicWsClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws.kraken.com/v2',
    WebSocketCtor,
    openObserver: connected$,
    closeObserver: disconnected$
});

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    let lastHeartbeatTs: number = null;
    const maxSecondsWithoutHeartbeat = 10;
    PublicWs.heartbeat$.subscribe(() => {
        const now = new Date().getTime();
        if (lastHeartbeatTs) {
            const diff = (now - lastHeartbeatTs) / 1000;
            if (diff > maxSecondsWithoutHeartbeat) {
                throw `heartbeat timed out after ${maxSecondsWithoutHeartbeat} seconds`;
            }
        }
        lastHeartbeatTs = now;
    });
* ```
*/
export const heartbeat$: Observable<Heartbeat.Update> = publicWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'));

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicWs.status$.subscribe(({ channel, data: [{ api_version, system }] }) => {
        console.log({ channel, api_version, system });
    });
* ```
*/
export const status$: Observable<Status.Update> = publicWsClient.pipe(filter(({ channel, type, data }) => data && type && channel === 'status'));

/**
 * Returns a Promise from a public WebsocketV2 method request.
 * 
 * @example
 * ```ts
    import { publicWsRequest } from 'ts-kraken';

    publicWsRequest({ method: 'ping', req_id: 42 })
        .then(({ method, req_id, time_in, time_out }) => {
            console.log({ method, req_id, time_in, time_out });
        });
* ```
*/
export async function publicWsRequest<T extends PublicWsRequest>(request: T): Promise<PublicWsResponse<T>> {
    const { req_id, method } = request;

    const [wsResponse] = await Promise.all([
        lastValueFrom(publicWsClient.pipe(
            filter(({ method: res_method, req_id: res_id }) => res_id ? res_id === req_id : method === 'ping' ? res_method === 'pong' : method === res_method),
            first(),
            timeout(30000) // Assume something went wrong if we didn't get a WS response within 30 seconds...
        )),
        publicWsClient.next(request)
    ]);

    return wsResponse as PublicWsResponse<T>;
}

/**
 * Returns a {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable} for the given
 * public channel. You can call `.subscribe()` on this `Observable` to receive data updates.
 * 
 * @example
 * ```ts
    import { publicWsSubscription } from 'ts-kraken';

    publicWsSubscription({ channel: 'ticker', params: { symbol: ['BTC/USD'] } })
        .subscribe(({ data: [{ symbol, last }] }) => {
            console.log({ symbol, last });
        });
* ```
*/
export function publicWsSubscription<C extends PublicSubscriptionChannel>({
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
