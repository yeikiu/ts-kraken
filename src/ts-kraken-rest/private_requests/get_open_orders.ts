import { OrderSnapshot } from '../../types/order_snapshot'
import { privateRESTRequest } from '../private_rest_request'

// 
// https://www.kraken.com/features/api#get-open-orders 
//
type GetOpenOrdersParams = {
    trades?: true | null;
    userref?: number;
}

export const getOpenOrders = async (params?: GetOpenOrdersParams): Promise<OrderSnapshot[]> => {
    const { open } = await privateRESTRequest({ url: 'OpenOrders', data: { ...params ? params : {} }}) || {}
    const openOrdersIds = Object.keys(open)
    return openOrdersIds.map(orderid => ({
        orderid,
        avg_price: closed[orderid].price, // injected
        ...closed[orderid]
    }) as OrderSnapshot)
}
