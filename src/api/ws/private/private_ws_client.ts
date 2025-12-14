import { webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs/internal/Subject';
import { filter, first, timeout } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
import { Heartbeat } from '../../../types/ws';
import { ApiCredentials, ApiToken } from '../../../types/rest/private';
import { PrivateSubscription, PrivateSubscriptionChannel, PrivateSubscriptionParams, PrivateSubscriptionUpdate, PrivateWsRequest, PrivateWsResponse } from '../../../types/ws/private';
import { getWsAuthToken } from '../../rest/private/helpers';
import { isBrowser } from '../../../util/is_browser';

// Use native WebSocket in browser, ws package in Node.js
let WebSocketCtor: typeof WebSocket;
if (isBrowser()) {
    // Browser environment - use native WebSocket
    WebSocketCtor = WebSocket;
} else {
    // Node.js environment - use ws package
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    WebSocketCtor = require('ws');
}

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 *
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.connected$.subscribe(() => {
        console.log('Private WebsocketV2 connected successfully!\n');
    });
* ```
*/
export const connected$ = new Subject();

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}.
 *
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.disconnected$.subscribe(() => {
        console.log('Private WebsocketV2 connection closed!\n');

        // Code to handle connection lost here...
    });
* ```
*/
export const disconnected$ = new Subject();

// WebSockets don't have CORS restrictions, so we can connect directly in both environments
const getWsURL = () => {
    return 'wss://ws-auth.kraken.com/v2';
};

const privateWsClient = webSocket({
    protocol: 'v1',
    url: getWsURL(),
    WebSocketCtor,
    openObserver: connected$,
    closeObserver: disconnected$
});

/**
 * You can call `.subscribe()` on this {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable}
 * 
 * @example
 * ```ts
    import { privateWsHeartbeat$ } from 'ts-kraken';

    let lastHeartbeatTs = new Date().getTime();
    privateWsHeartbeat$.subscribe(() => {
        lastHeartbeatTs = new Date().getTime();
    });

    const maxSecondsWithoutHeartbeat = 30;
    setInterval(() => {
        const now = new Date().getTime();
        const diff = Math.ceil((now - lastHeartbeatTs) / 1000);
        if (diff >= maxSecondsWithoutHeartbeat) {
            throw `Error: No heartbeat in the last ${diff} seconds`;
        }
    }, maxSecondsWithoutHeartbeat * 1000);
* ```
*/
export const heartbeat$: Observable<Heartbeat.Update> = privateWsClient.pipe(filter(({ channel }) => channel === 'heartbeat'));

function isToken(tokenOrKeys: ApiToken | ApiCredentials): tokenOrKeys is ApiToken {
    return typeof tokenOrKeys === 'string';
}

/**
 * Returns a Promise from a private WebsocketV2 method request.
 * 
 * @example
 * ```ts
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({ method: 'cancel_all' }).then(({ count }) => {
        console.log({ count });
    }).catch(error => {
        console.error({ error });
    });
* ```
*/
export async function privateWsRequest<R extends PrivateWsRequest>(request: R, tokenOrKeys?: ApiToken | ApiCredentials): Promise<PrivateWsResponse<R>['result']> {
    const token = isToken(tokenOrKeys) ? tokenOrKeys : await getWsAuthToken(tokenOrKeys);
    const { req_id, method } = request;

    const [wsResponse] = await Promise.all([
        lastValueFrom(privateWsClient.pipe(
            filter(({  method: res_method, req_id: res_id }) => res_id ? res_id === req_id : method === res_method),
            first(),
            timeout(30000) // Assume something went wrong if we didn't get a WS response within 30 seconds...
        )) as Promise<PrivateWsResponse<R>>,
        privateWsClient.next({
            ...request,
            params: {
                ...request.params,
                token
            }
        })
    ]);

    if(wsResponse.success) {
        // TODO: report `batch_cancel` is missing the `result` field in the response
        if (method === 'batch_cancel' && 'orders_cancelled' in wsResponse) {
            return { orders_cancelled: wsResponse.orders_cancelled } as PrivateWsResponse<R>['result'];
        }
        return wsResponse.result;
    }

    throw `Method ${method} returned error: ${wsResponse?.error ?? 'unknown'}`;
}

/**
 * Returns a Promise of a {@link https://rxjs.dev/api/index/class/Observable | RxJS Observable} for the given
 * private channel. You can call `.subscribe()` on the resolved `Observable` to receive data updates.
 * 
 * @example
 * ```ts
    import { privateWsSubscription } from 'ts-kraken';

    privateWsSubscription({
        channel: 'balances',
        params: { snapshot: true }

    }).then(balancesObservable$ => {
        balancesObservable$.subscribe(({ data: balancesData }) => {
            console.log({ balancesData });
        });
    });
* ```
*/
export async function privateWsSubscription<C extends PrivateSubscriptionChannel>({
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
