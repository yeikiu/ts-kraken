import { gethWsAuthToken, privateWSClient } from '../private_ws_client'
import { InjectedApiKeys } from '../../types/injected_api_keys'
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

    const { unsubscribe: openOrdersUnsubscribe } = openOrdersWS.subscribe(([ordersSnapshot]) => {
        ordersSnapshot.forEach(krakenOrder => {
            const [orderid] = Object.keys(krakenOrder)

            if (closedOrdersIds.has(orderid)) { 
                currentOpenOrdersMap.delete(orderid)
                return
            }

            const orderSnapshot: OrderSnapshot = {
                orderid, // injected
                price: krakenOrder[orderid].avg_price, // injected
                ...currentOpenOrdersMap.get(orderid),
                ...krakenOrder[orderid],
            }

            if (!currentOpenOrdersMap.has(orderid)) {
                currentOpenOrdersMap.set(orderid, orderSnapshot)
                openOrderIn$.next(orderSnapshot)
            
            } else if (['closed', 'expired', 'canceled'].includes(orderSnapshot.status)) {
                closedOrdersIds.add(orderid)
                currentOpenOrdersMap.delete(orderid)
                closedOrderOut$.next(orderSnapshot)
            
            } else {
                currentOpenOrdersMap.set(orderid, orderSnapshot)
            }
        })

        openOrders$.next(Array.from(currentOpenOrdersMap.values()))

    }, openOrdersStreamError => {
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
