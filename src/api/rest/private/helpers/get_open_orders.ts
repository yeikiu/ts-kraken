import { privateRestRequest } from '..';
import { ApiCredentials } from '../../../../types/rest/private';
import { IRestOpenOrder, OpenOrders } from '../../../../types/rest/private/endpoints';

/**
 * Returns a nice array of current open orders. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-open-orders | Get Open Orders}
 * 
 * @example
 * ```ts
    import { getOpenOrders } from 'ts-kraken';

    getOpenOrders()
        .then(openOrdersArr => {
            const openOrdersIds = openOrdersArr.map(({ orderid }) => orderid);
            console.log({ openOrdersIds });
        });
 * ```
 */
export const getOpenOrders = async (params: OpenOrders.Params = {}, injectedApiKeys?: ApiCredentials): Promise<IRestOpenOrder[]> => {
    const { open } = await privateRestRequest({ url: 'OpenOrders', data: params }, injectedApiKeys);
    const openOrdersIds = Object.keys(open);

    return openOrdersIds.map(orderid => ({
        orderid, // injected for improved response usability
        ...open[orderid]
    }));
};
