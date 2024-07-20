import { lastValueFrom, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { privateRestRequest } from '../private_rest_request';
import { ClosedOrders, IRestOrderSnapshot } from '$types/rest/private/endpoints';
import { ApiCredentials } from '$types/ws/private';

/**
 * Returns a nice array of latest closed orders
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getClosedOrders | getClosedOrders}
 *
 * @param params - GetClosedOrdersParams
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Array<IRestOrderSnapshot>
 *
 * @beta
 */
export const getClosedOrders = async (params?: ClosedOrders.Params, injectedApiKeys?: ApiCredentials): Promise<IRestOrderSnapshot[]> => {
    const { closed } = await privateRestRequest({ url: 'ClosedOrders', data: params }, injectedApiKeys);
    const closedOrdersIds = Object.keys(closed);

    return closedOrdersIds.map(orderid => ({
        ...closed[orderid],
        orderid, // injected for improved response usability
    }));
};

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
 * @returns IRestOrderSnapshot
 *
 * @beta
 */
export const findClosedOrder = async ({
    orderFilter, maxOffset = 1000, data = {}
}: {
    orderFilter: (f: Partial<IRestOrderSnapshot>) => boolean;
    maxOffset?: number;
    data?: ClosedOrders.Params

}, injectedApiKeys?: ApiCredentials): Promise<IRestOrderSnapshot> => {
    if (data?.ofs > maxOffset) {
        console.error(`Order not found within the first ${maxOffset} results...`);
        return null;
    }

    const closedOrders = await getClosedOrders(data);
    const lastSuccessfullyClosedOrder = closedOrders.find(orderFilter);
    if (lastSuccessfullyClosedOrder) {
        return lastSuccessfullyClosedOrder;
    }

    // Delay exec. 1.5 seconds to avoid rate limits
    await lastValueFrom(timer(1500).pipe(take(1)));
    const { ofs: lastOffset = 0 } = data ?? {};

    return await findClosedOrder({
        orderFilter,
        maxOffset,
        data: { ...data, ofs: closedOrders.length + lastOffset }
    }, injectedApiKeys);
};
