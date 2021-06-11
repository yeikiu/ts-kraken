import { privateSubscriptionHandler } from '../private_ws_client'
import { ReplaySubject, Subject } from 'rxjs'
import { IOrderSnapshot } from '../../../types/order_snapshot'
import { PrivateREST } from '../../../types/rest/private'

type GetOpenOrdersStreamParams = {
    injectedApiKeys?: PrivateREST.RuntimeApiKeys;
    wsToken?: string;
}

export type OpenOrdersStream = {
    openOrders$: ReplaySubject<IOrderSnapshot[]>;
    currentOpenOrdersMap: Map<string, IOrderSnapshot>;
    openOrderIn$: Subject<IOrderSnapshot>;
    closedOrderOut$: Subject<IOrderSnapshot>;
    closedOrdersIds: Set<string>;
    openOrdersUnsubscribe: () => void;
}

// 
// https://docs.kraken.com/websockets/#message-openOrders
// 
export const getOpenOrdersStream = async ({ injectedApiKeys, wsToken }: GetOpenOrdersStreamParams): Promise<OpenOrdersStream> => {
    const openOrders$ = new ReplaySubject<IOrderSnapshot[]>(1);
    const currentOpenOrdersMap = new Map<string, IOrderSnapshot>()
    const openOrderIn$ = new Subject<IOrderSnapshot>();
    const closedOrderOut$ = new Subject<IOrderSnapshot>();

    const closedOrdersIds = new Set<string>();
    const openOrdersWS = await privateSubscriptionHandler({
        channelName: 'openOrders'
    })
    
    const { unsubscribe: openOrdersUnsubscribe } = openOrdersWS.subscribe(([ordersSnapshot]) => {
        ordersSnapshot.forEach(krakenOrder => {
            const [orderid] = Object.keys(krakenOrder)

            if (closedOrdersIds.has(orderid)) { 
                currentOpenOrdersMap.delete(orderid)
                return
            }

            const orderSnapshot: IOrderSnapshot = {
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
