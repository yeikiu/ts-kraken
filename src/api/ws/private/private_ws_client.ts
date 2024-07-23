/* https://docs.kraken.com/api/docs/websocket-v2/status */

import WebSocketCtor from 'ws';
import { webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs/internal/Subject';
import { filter, first, timeout } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { getWsAuthToken } from '../../rest/private';
import { Heartbeat, Status } from '$types/ws/public/channels';
import { ApiCredentials, ApiToken, PrivateRequest, PrivateResponse, PrivateSubscription, PrivateSubscriptionChannel, PrivateSubscriptionParams, PrivateSubscriptionUpdate } from '$types/ws/private';

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.onPrivateWsOpen$.subscribe(() => {
        console.log('WebsocketV2 connected successfully!\n');
    });

    PrivateWs.privateWsStatus$.subscribe(({ channel, data: [{ api_version, system }] }) => {
        console.log({ channel, api_version, system });
    });
* ```
*/
export const onPrivateWsOpen$ = new Subject();

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.onPrivateWsClose$.subscribe(() => {
        console.log('WebsocketV2 connection closed!\n');
        
        // Code to handle lost connection here...
    });
* ```
*/
export const onPrivateWsClose$ = new Subject();

const privateWsClient = webSocket({
    protocol: 'v1',
    url: 'wss://ws-auth.kraken.com/v2',
    WebSocketCtor,
    openObserver: onPrivateWsOpen$,
    closeObserver: onPrivateWsClose$
});

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    let lastHeartbeatTs: number = null;
    const maxSecondsWithoutHeartbeat = 10;
    PrivateWs.privateWsHeartbeat$.subscribe(() => {
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
export const privateWsHeartbeat$: Observable<Heartbeat.Update> = privateWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'));

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.privateWsStatus$.subscribe(({ channel, data: [{ api_version, system }] }) => {
        console.log({ channel, api_version, system });
    });
* ```
*/
export const privateWsStatus$: Observable<Status.Update> = privateWsClient.pipe(filter(({ channel, type, data }) => data && type && channel === 'status'));

function isToken(tokenOrKeys: ApiToken | ApiCredentials): tokenOrKeys is ApiToken {
    return typeof tokenOrKeys === 'string';
}

export async function sendPrivateEvent<T extends PrivateRequest>(request: T, tokenOrKeys?: ApiToken | ApiCredentials): Promise<PrivateResponse<T>> {
    const token = isToken(tokenOrKeys) ? tokenOrKeys : await getWsAuthToken(tokenOrKeys);
    const { req_id, method } = request;

    const [wsResponse] = await Promise.all([
        lastValueFrom(privateWsClient.pipe(
            filter(({  method: res_method, req_id: res_id }) => res_id ? res_id === req_id : method === res_method),
            first(),
            timeout(30000) // Assume something went wrong if we didn't get a WS response within 30 seconds...
        )),
        privateWsClient.next({
            ...request,
            params: {
                ...request.params,
                token
            }
        })
    ]);

    return wsResponse as PrivateResponse<T>;
}

export async function getPrivateSubscription<C extends PrivateSubscriptionChannel>({
    channel, params, req_id
}: {
    channel: C, req_id?: PrivateSubscription<C>['req_id']
} & PrivateSubscriptionParams<C>, tokenOrKeys?: ApiToken | ApiCredentials): Promise<Observable<PrivateSubscriptionUpdate<C>>> {

    const token = isToken(tokenOrKeys) ? tokenOrKeys : await getWsAuthToken(tokenOrKeys);

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
