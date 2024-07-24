/* https://docs.kraken.com/api/docs/websocket-v2/status */

import { filter, first, timeout } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { webSocket } from 'rxjs/webSocket';
import WebSocketCtor from 'ws';
import { PublicRequest, PublicResponse, PublicSubscription, PublicSubscriptionChannel, PublicSubscriptionParams, PublicSubscriptionUpdate } from '$types/ws/public';
import { Heartbeat, Status } from '$types/ws/public/channels';

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicWs.onPublicWsOpen$.subscribe(() => {
        console.log('Public WebsocketV2 connected successfully!\n');
    });
* ```
*/
export const onPublicWsOpen$ = new Subject();

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicWs.onPublicWsClose$.subscribe(() => {
        console.log('Public WebsocketV2 connection closed!\n');
        
        // Code to handle lost connection here...
    });
* ```
*/
export const onPublicWsClose$ = new Subject();

const publicWsClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws.kraken.com/v2',
    WebSocketCtor,
    openObserver: onPublicWsOpen$,
    closeObserver: onPublicWsClose$
});

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    let lastHeartbeatTs: number = null;
    const maxSecondsWithoutHeartbeat = 10;
    PublicWs.publicWsHeartbeat$.subscribe(() => {
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
export const publicWsHeartbeat$: Observable<Heartbeat.Update> = publicWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'));

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PrivateWs.publicWsStatus$.subscribe(({ channel, data: [{ api_version, system }] }) => {
        console.log({ channel, api_version, system });
    });
* ```
*/
export const publicWsStatus$: Observable<Status.Update> = publicWsClient.pipe(filter(({ channel, type, data }) => data && type && channel === 'status'));

/**
 * Returns a Promise from a public WebsocketV2 method request.
 * 
 * @example
 * ```ts
    import { PublicWs } from 'ts-kraken';

    PublicRest.publicRestRequest({
        url: 'Ticker',
        params: { pair: 'BTCUSD,ETHEUR' },

    }).then((btcAndEthTickers) => {
        console.log({ btcAndEthTickers });

    }).catch(error => {
        console.error({ error });
    });
* ```
*/
export async function sendPublicRequest<T extends PublicRequest>(request: T): Promise<PublicResponse<T>> {
    const { req_id, method } = request;

    const [wsResponse] = await Promise.all([
        lastValueFrom(publicWsClient.pipe(
            filter(({ method: res_method, req_id: res_id }) => res_id ? res_id === req_id : method === 'ping' ? res_method === 'pong' : method === res_method),
            first(),
            timeout(30000) // Assume something went wrong if we didn't get a WS response within 30 seconds...
        )),
        publicWsClient.next(request)
    ]);

    return wsResponse as PublicResponse<T>;
}

/**
 * Returns a {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable} for the given
 * public channel. You can call `.subscribe()` on this `Observable` to receive data updates.
 * 
 * @example
 * ```ts
    import { PublicRest } from 'ts-kraken';

    PublicWs.getPublicSubscription({ channel: 'ticker', params: { symbol: ['BTC/USD'] } })
        .subscribe(({ data: [{ symbol, last }] }) => {
            console.log({ symbol, last });
        });
* ```
*/
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
