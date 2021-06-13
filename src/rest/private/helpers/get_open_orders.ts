import { IOrderSnapshot } from '../../../types/order_snapshot'
import { privateRESTRequest } from '../private_rest_request'

// 
// https://docs.kraken.com/rest/#operation/getOpenOrders
//
type GetOpenOrdersParams = {
    trades?: true | null;
    userref?: number;
}

export const getOpenOrders = async (params?: GetOpenOrdersParams): Promise<IOrderSnapshot[]> => {
    const { open } = await privateRESTRequest({ url: 'OpenOrders', data: { ...params ? params : {} }})
    const openOrdersIds = Object.keys(open)
    return openOrdersIds.map(orderid => ({
        orderid, // injected
        avg_price: open[orderid].price, // injected
        cancel_reason: open[orderid].reason, // injected
        ...open[orderid]
    }) as IOrderSnapshot)
}
