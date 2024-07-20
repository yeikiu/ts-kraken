import { IRestOrderSnapshot, privateRestRequest } from '..'
import { ApiCredentials } from '$types/ws/private'
import { OpenOrders } from '$types/rest/private/endpoints'

/**
 * Returns a nice array of current open orders
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getOpenOrders | getOpenOrders}
 *
 * @param params - GetOpenOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Array<IRestOrderSnapshot>
 *
 * @beta
 */
export const getOpenOrders = async (params?: OpenOrders.Params, injectedApiKeys?: ApiCredentials): Promise<IRestOrderSnapshot[]> => {
    const { open } = await privateRestRequest({ url: 'OpenOrders', data: params }, injectedApiKeys)
    const openOrdersIds = Object.keys(open)

    return openOrdersIds.map(orderid => ({
        orderid, // injected for improved response usability
        ...open[orderid]
    }))
}
