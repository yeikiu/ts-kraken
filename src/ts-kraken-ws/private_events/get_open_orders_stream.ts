import { gethWsAuthToken, privateWSClient } from '../private_ws_client'
import { InjectedApiKeys } from '../../types/injected_api_keys'
import { filter, map } from 'rxjs/operators'
import { ReplaySubject, Subject } from 'rxjs'
import { OrderSnapshot } from '../../types/order_snapshot'

type GetOpenOrdersStreamParams = {
    injectedApiKeys?: InjectedApiKeys;
    wsToken?: string;
}

export type OpenOrdersStream = {
    openOrders$: ReplaySubject<OrderSnapshot[]>;
    currentOpenOrdersMap: Map<string, OrderSnapshot>;
    openOrderIn$: Subject<OrderSnapshot>;
    closedOrderOut$: Subject<OrderSnapshot>;
    closedOrdersIds: Set<string>;
    openOrdersUnsubscribe: () => void;
}

// 
// https://docs.kraken.com/websockets/#message-openOrders
// 
export const getOpenOrdersStream = async ({ injectedApiKeys, wsToken }: GetOpenOrdersStreamParams): Promise<OpenOrdersStream> => {
    const openOrders$ = new ReplaySubject<OrderSnapshot[]>(1);
    const currentOpenOrdersMap = new Map<string, OrderSnapshot>()
    const openOrderIn$ = new Subject<OrderSnapshot>();
    const closedOrderOut$ = new Subject<OrderSnapshot>();

    const closedOrdersIds = new Set<string>();
    const token = wsToken ?? await gethWsAuthToken(injectedApiKeys)
    
    const openOrdersWS = privateWSClient.multiplex(() => ({
        event: 'subscribe',
        subscription: {
            name: 'openOrders',
            token
        }
    }), () => ({
        event: 'unsubscribe',
        subscription: {
            name: 'openOrders',
            token
        }
    }), (response) => Array.isArray(response) && response.length > 1 && response[1] === 'openOrders')

    const { unsubscribe: openOrdersUnsubscribe } = openOrdersWS.pipe(filter(Boolean), map(([ordersSnapshot]) => {
        const currentOpenOrders = ordersSnapshot.map(krakenOrder => {
            const [orderid] = Object.keys(krakenOrder)

            if (closedOrdersIds.has(orderid)) { return null }

            const orderSnapshot: OrderSnapshot = {
                orderid, // injected
                price: krakenOrder[orderid].avg_price, // injected
                ...krakenOrder[orderid]
            }

            if (!currentOpenOrdersMap.has(orderSnapshot.orderid)) {
                openOrderIn$.next(orderSnapshot)
                currentOpenOrdersMap.set(orderSnapshot.orderid, { ...orderSnapshot })
            
            } else if (['closed', 'expired', 'canceled'].includes(orderSnapshot.status)) {
                closedOrderOut$.next(orderSnapshot)
                closedOrdersIds.add(orderSnapshot.orderid)
                currentOpenOrdersMap.delete(orderSnapshot.orderid)
            
            } else {
                currentOpenOrdersMap.set(orderSnapshot.orderid, { ...currentOpenOrdersMap.get(orderSnapshot.orderid), ...orderSnapshot })
            }

            return orderSnapshot
        }).filter(krakenOrder => krakenOrder !== null)

        return currentOpenOrders
    })).subscribe(openOrders => { openOrders$.next(openOrders) }, openOrdersStreamError => {
        openOrders$.error(openOrdersStreamError)
        openOrderIn$.error(openOrdersStreamError)
        closedOrderOut$.error(openOrdersStreamError)
    })

    return {
        openOrders$,
        currentOpenOrdersMap,
        openOrderIn$,
        closedOrderOut$,
        closedOrdersIds,
        openOrdersUnsubscribe
    }
}
