import { lastValueFrom, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { privateRestRequest } from '../private_rest_request';
import { ClosedOrders, IRestClosedOrder } from '../../../../types/rest/private/endpoints';
import { ApiCredentials } from '../../../../types/rest/private';

const REST_ORDERS_LIMIT = 50;

type IRestClosedOrdersParams = {
    data?: ClosedOrders.Params;
    extra?: {
        closedBuffer?: ClosedOrders.Result['closed'];
        numOrders?: number;
    };
    injectedApiKeys?: ApiCredentials
};

/**
 * Returns a nice array of latest closed orders. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | getClosedOrders}
 * 
 * @example
 * ```ts
    import { getClosedOrders } from 'ts-kraken';

    // Fetch latest closed orders and logs them
    getClosedOrders()
        .then(lastClosedOrdersArr => {
            const closedOrders = lastClosedOrdersArr
                .map(({ orderid, descr: { order } }) => ({ orderid, order }));
                
            console.table(closedOrders);
        });
 * ```
 */
export const getClosedOrders = async ({
    data = {},
    extra = {
        numOrders: REST_ORDERS_LIMIT
    },
    injectedApiKeys,
}: IRestClosedOrdersParams = {}): Promise<IRestClosedOrder[]> => {
    const { closed = {} } = await privateRestRequest({ url: 'ClosedOrders', data }, injectedApiKeys);

    const closedOrdersIds = Object.keys(closed);

    const closedBufferOrdersIds = Object.keys(extra?.closedBuffer ?? {});
    const mergedClosedOrdersIds = [...closedBufferOrdersIds, ...closedOrdersIds];

    const mergedClosedOrders = {
        ...extra?.closedBuffer ?? {},
        ...closed
    };

    const ordersLimit = extra?.numOrders ?? REST_ORDERS_LIMIT;

    if (
        mergedClosedOrdersIds.length < ordersLimit &&
        closedOrdersIds.length === REST_ORDERS_LIMIT
    ) {
        // Delay exec. 1.5 seconds to avoid rate limits
        await lastValueFrom(timer(1500).pipe(take(1)));
        const { ofs: lastOffset = 0 } = data ?? {};

        return getClosedOrders({
            data: {
                ...data,
                ofs: lastOffset + REST_ORDERS_LIMIT,
            },
            extra: {
                ...extra,
                closedBuffer: mergedClosedOrders,
            },
            injectedApiKeys
        });
    }

    return mergedClosedOrdersIds.slice(0, ordersLimit).map(orderid => ({
        ...mergedClosedOrders[orderid],
        orderid, // injected for improved response usability
    }));
};

/**
 * @beta
 * <strong>Bonus method!</strong> - Returns the first closed order (single object) to satisfy the filter. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | Get Closed Orders}
 * 
 * @example
 * ```ts 
    import { findClosedOrder } from 'ts-kraken';

    findClosedOrder({
        restData: { extra: { numOrders: 50 } },
        orderFilter: ({ userref }) => (userref?.toString() ?? '').startsWith('100033')
    }).then(lastCanceledOrder => {
        console.log({ lastCanceledOrder });
    });
 * ```
 * 
 * @remarks
 * This method might run **extremely slow** for accounts with many past orders
 */
export const findClosedOrder = async ({
    orderFilter,
    restData = {
        data: {},
        extra: {},
    }
}: {
    orderFilter: (filterFields: Partial<IRestClosedOrder>) => boolean;
    restData?: IRestClosedOrdersParams
}): Promise<IRestClosedOrder> => {

    const closedOrders = await getClosedOrders(restData);
    const lastSuccessfullyClosedOrder = closedOrders
        .find(orderFilter);

    if (lastSuccessfullyClosedOrder) {
        return lastSuccessfullyClosedOrder;
    }

    console.error(`Order not found within the first ${restData?.extra?.numOrders ?? REST_ORDERS_LIMIT} results...`);
    return null;
};
