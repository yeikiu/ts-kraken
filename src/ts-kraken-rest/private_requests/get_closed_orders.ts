import { timer } from 'rxjs'
import { take } from 'rxjs/operators'
import { OrderSnapshot } from '../../types/order_snapshot'
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
// https://www..com/features/api#get-closed-orders
//
export const getClosedOrders = async (params?: GetClosedOrdersParams): Promise<OrderSnapshot[]> => {
    const { closed } = await privateRESTRequest({ url: 'ClosedOrders', data: { ...params ? params : {} }}) || {}
    const closedOrdersIds = Object.keys(closed)
    return closedOrdersIds.map(orderid => ({
        orderid,
        avg_price: closed[orderid].price, // injected
        ...closed[orderid]
    }) as OrderSnapshot)
}

// Bonus method! 
export const findClosedOrder = async (orderFilter: (orderFilter: Partial<OrderSnapshot>) => boolean, params: GetClosedOrdersParams = {}): Promise<OrderSnapshot> => {
    const closedOrders = await getClosedOrders(params)
    const lastSuccessfullyClosedOrder = closedOrders.find(orderFilter)
    if (lastSuccessfullyClosedOrder) {
        return lastSuccessfullyClosedOrder
    } else {
        // Delay exec. 1.5 seconds to avoid rate limits
        await timer(1500).pipe(take(1)).toPromise()
        const { ofs: lastOffset = 0 } = params
        return findClosedOrder(
            orderFilter,
            { ...params, ofs: closedOrders.length + lastOffset }
        )
    }
}
