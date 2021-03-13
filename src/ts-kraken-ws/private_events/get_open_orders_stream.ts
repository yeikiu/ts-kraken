import { gethWsAuthToken, privateWSClient } from '../private_ws_client'
import { InjectedApiKeys } from '../../types/injected_api_keys'
import { Observable } from 'rxjs/internal/Observable'
import { filter, map } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { OrderSnapshot } from '../../types/order_snapshot'

type GetWSopenOrdersStreamParams = {
    injectedApiKeys?: InjectedApiKeys;
    wsToken?: string;
}
export type WSopenOrdersStream = {
    openOrders$: Observable<OrderSnapshot[]>;
    currentOpenOrdersMap: Map<string, OrderSnapshot>;
    openOrderIn$: Subject<OrderSnapshot>;
    closedOrderOut$: Subject<OrderSnapshot>;
    closedOrdersIds: Set<string>;
}
export const getWSOpenOrdersStream = async ({ injectedApiKeys, wsToken }: GetWSopenOrdersStreamParams): Promise<WSopenOrdersStream> => {
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

    const openOrders$ = openOrdersWS.pipe(filter(Boolean), map(([ordersSnapshot]) => {
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
    }))
    openOrders$.subscribe()

    return {
        openOrders$,
        currentOpenOrdersMap,
        openOrderIn$,
        closedOrderOut$,
        closedOrdersIds,
    }
}
