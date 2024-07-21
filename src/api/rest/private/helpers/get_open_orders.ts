import { privateRestRequest } from '..';
import { ApiCredentials } from '$types/ws/private';
import { OpenOrders } from '$types/rest/private/endpoints';

type IRestOpenOrder = OpenOrders.RestOpenOrder & { orderid: string; };

/**
 * Returns a nice array of current open orders. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-open-orders | Get Open Orders}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.getOpenOrders().then(openOrdersArr => {
        const openOrdersIds = openOrdersArr.map(({ orderid }) => orderid);
        console.log({ openOrdersIds });
    });
 * ```
 */
export const getOpenOrders = async (params?: OpenOrders.Params, injectedApiKeys?: ApiCredentials): Promise<IRestOpenOrder[]> => {
    const { open } = await privateRestRequest({ url: 'OpenOrders', data: params }, injectedApiKeys);
    const openOrdersIds = Object.keys(open);

    return openOrdersIds.map(orderid => ({
        orderid, // injected for improved response usability
        ...open[orderid]
    }));
};
