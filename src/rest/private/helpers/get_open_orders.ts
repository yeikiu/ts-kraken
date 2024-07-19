import { privateRestRequest } from '../../..'

import type { IOrderSnapshot } from '../../../types'
import { OpenOrders } from '../../../types/rest/private/endpoints'
import { ApiCredentials } from '../../../types/ws/private'

/**
 * Returns a nice array of current open orders
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getOpenOrders | getOpenOrders}
 *
 * @param params - GetOpenOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Array<IOrderSnapshot>
 *
 * @beta
 */
export const getOpenOrders = async (params?: OpenOrders.Params, injectedApiKeys?: ApiCredentials): Promise<IOrderSnapshot[]> => {
  const { open } = await privateRestRequest({ url: 'OpenOrders', data: params }, injectedApiKeys)
  const openOrdersIds = Object.keys(open)
  return openOrdersIds.map(orderid => ({
    orderid, // injected for improved response usability
    avg_price: open[orderid].price, // injected for consistency with WS openOrders payload
    ...open[orderid]
  }) as IOrderSnapshot)
}
