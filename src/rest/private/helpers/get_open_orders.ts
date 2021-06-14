import { IOrderSnapshot } from '../../../types/order_snapshot'
import { PrivateREST } from '../../../types/rest/private'
import { privateRESTRequest } from '../private_rest_request'

type GetOpenOrdersParams = {
    trades?: boolean;
    userref?: number;
}

/**
 * Returns a nice array of current open orders
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getOpenOrders | getOpenOrders}
 *
 * @param data - GetOpenOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Array<IOrderSnapshot >
 *
 * @beta
 */
export const getOpenOrders = async (data?: GetOpenOrdersParams, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<IOrderSnapshot[]> => {
    const { open } = await privateRESTRequest({ url: 'OpenOrders', data }, injectedApiKeys)
    const openOrdersIds = Object.keys(open)
    return openOrdersIds.map(orderid => ({
        orderid, // injected for improved response usability
        avg_price: open[orderid].price, // injected for consistency with WS openOrders payload
        ...open[orderid]
    }) as IOrderSnapshot)
}
