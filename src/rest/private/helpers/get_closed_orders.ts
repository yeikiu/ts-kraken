import { timer } from 'rxjs'
import { take } from 'rxjs/operators'
import { IOrderSnapshot } from '../../../types/order_snapshot'
import { privateRESTRequest } from '../private_rest_request'

type GetClosedOrdersParams = {
    trades?: true | null;
    userref?: number;
    start?: number;
    end?: number;
    ofs?: number;
    closetime?: 'open' | 'close' | 'both';
}

// 
// https://docs.kraken.com/rest/#operation/getClosedOrders
//
export const getClosedOrders = async (params?: GetClosedOrdersParams): Promise<IOrderSnapshot[]> => {
    const { closed } = await privateRESTRequest({ url: 'ClosedOrders', data: { ...params ? params : {} }})
    const closedOrdersIds = Object.keys(closed)
    return closedOrdersIds.map(orderid => ({
        orderid,
        avg_price: closed[orderid].price, // injected
        ...closed[orderid]
    }) as IOrderSnapshot)
}

// Bonus method! 
export const findClosedOrder = async (orderFilter: (orderFilter: Partial<IOrderSnapshot>) => boolean, params: GetClosedOrdersParams = {}): Promise<IOrderSnapshot> => {
    const closedOrders = await getClosedOrders(params)
    const lastSuccessfullyClosedOrder = closedOrders.find(orderFilter)
    if (lastSuccessfullyClosedOrder) {
        return lastSuccessfullyClosedOrder
    }
    
    // Delay exec. 1.5 seconds to avoid rate limits
    await timer(1500).pipe(take(1)).toPromise()
    const { ofs: lastOffset = 0 } = params
    return findClosedOrder(
        orderFilter,
        { ...params, ofs: closedOrders.length + lastOffset }
    )
}
