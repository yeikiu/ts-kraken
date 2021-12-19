import { lastValueFrom, timer } from 'rxjs'
import { take } from 'rxjs/operators'
import { privateRESTRequest } from '../../..'

import type { IOrderSnapshot, RuntimeApiKeys, PrivateREST } from '../../../types'

/**
 * Returns a nice array of latest closed orders
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getClosedOrders | getClosedOrders}
 *
 * @param params - GetClosedOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Array<IOrderSnapshot>
 *
 * @beta
 */
export const getClosedOrders = async (params?: PrivateREST.Helpers.GetClosedOrdersParams, injectedApiKeys?: RuntimeApiKeys): Promise<IOrderSnapshot[]> => {
  const { closed } = await privateRESTRequest({ url: 'ClosedOrders', data: params }, injectedApiKeys)
  const closedOrdersIds = Object.keys(closed)
  return closedOrdersIds.map(orderid => ({
    ...closed[orderid],
    orderid, // injected for improved response usability
    avg_price: closed[orderid].price, // injected for consistency with WS openOrders payload
    cancel_reason: closed[orderid].reason // same as above
  }) as IOrderSnapshot)
}

/**
 * Bonus method! - Returns the first closed order (single object) to satisfy the filter
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getClosedOrders | getClosedOrders}
 *
 *
 * @remarks
 * This method might run _extremely slow_ for accounts with many past orders
 *
 * @param FindClosedOrderParam - { filterFn: Filter to apply on closed orders sequentyally until we find one; maxOffset: Max. number of orders to search for backwards }
 * @param data - GetClosedOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns IOrderSnapshot
 *
 * @beta
 */
export const findClosedOrder = async ({ orderFilter, maxOffset = 1000, data = {} }: PrivateREST.Helpers.FindClosedOrderParam, injectedApiKeys?: RuntimeApiKeys): Promise<IOrderSnapshot | null> => {
  if (data?.ofs > maxOffset) {
    console.error(`Order not found within the first ${maxOffset} results...`)
    return null
  }

  const closedOrders = await getClosedOrders(data)
  const lastSuccessfullyClosedOrder = closedOrders.find(orderFilter)
  if (lastSuccessfullyClosedOrder) {
    return lastSuccessfullyClosedOrder
  }

  // Delay exec. 1.5 seconds to avoid rate limits
  await lastValueFrom(timer(1500).pipe(take(1)))
  const { ofs: lastOffset = 0 } = data ?? {}
  return await findClosedOrder({
    orderFilter,
    maxOffset,
    data: { ...data, ofs: closedOrders.length + lastOffset }
  }, injectedApiKeys)
}
