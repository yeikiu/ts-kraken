import { lastValueFrom, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { privateRestRequest } from '../private_rest_request';
import { ClosedOrders } from '$types/rest/private/endpoints';
import { ApiCredentials } from '$types/ws/private';

type IRestClosedOrder = ClosedOrders.RestClosedOrder & { orderid: string; };

/**
 * Returns a nice array of latest closed orders. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | getClosedOrders}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    // Fetch latest closed orders (skipping the last 50)
    PrivateRest.getClosedOrders({
        ofs: 50
    }).then(lastClosedOrder => {
        console.log({ lastClosedOrder });
    });
 * ```
 */
export const getClosedOrders = async (params?: ClosedOrders.Params, injectedApiKeys?: ApiCredentials): Promise<IRestClosedOrder[]> => {
    const { closed } = await privateRestRequest({ url: 'ClosedOrders', data: params }, injectedApiKeys);
    const closedOrdersIds = Object.keys(closed);

    return closedOrdersIds.map(orderid => ({
        ...closed[orderid],
        orderid, // injected for improved response usability
    }));
};

/**
 * @beta
 * <strong>Bonus method!</strong> - Returns the first closed order (single object) to satisfy the filter. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | Get Closed Orders}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.findClosedOrder({
        orderFilter: ({ status }) => status === 'canceled'
    }).then(lastCanceledOrder => {
        console.log({ lastCanceledOrder });
    });
 * ```
 * 
 * @remarks
 * This method might run **extremely slow** for accounts with many past orders
 */
export const findClosedOrder = async ({
    orderFilter, maxOffset = 1000, data = {}
}: {
    orderFilter: (filterFields: Partial<IRestClosedOrder>) => boolean;
    maxOffset?: number;
    data?: ClosedOrders.Params

}, injectedApiKeys?: ApiCredentials): Promise<IRestClosedOrder> => {
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
