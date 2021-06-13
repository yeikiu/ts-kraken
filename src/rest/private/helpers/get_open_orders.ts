import { IOrderSnapshot } from '../../../types/order_snapshot'
import { PrivateREST } from '../../../types/rest/private'
import { privateRESTRequest } from '../private_rest_request'

// 
// https://docs.kraken.com/rest/#operation/getOpenOrders
//
type GetOpenOrdersParams = {
    trades?: boolean;
    userref?: number;
}

export const getOpenOrders = async (data?: GetOpenOrdersParams, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<IOrderSnapshot[]> => {
    const { open } = await privateRESTRequest({ url: 'OpenOrders', data }, injectedApiKeys)
    const openOrdersIds = Object.keys(open)
    return openOrdersIds.map(orderid => ({
        orderid, // injected
        avg_price: open[orderid].price, // injected
        cancel_reason: open[orderid].reason, // injected
        ...open[orderid]
    }) as IOrderSnapshot)
}
