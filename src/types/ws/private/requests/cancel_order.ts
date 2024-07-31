import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/cancel_order | Cancel Order}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({
        method: 'cancel_order',
        params: { order_id: ['YOUR-ORDER-ID'] }

    }).then(({ order_id, warnings }) => {
        console.log({ order_id, warnings });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace CancelOrder {

    /** {@inheritDoc CancelOrder} */
    export type Request = BasePrivateWsRequest<'cancel_order', {
        order_id?: string[];
        cl_ord_id?: string[];
        order_userref?: number[];
    }>;

    /** {@inheritDoc CancelOrder} */
    export type Response = BasePrivateWsResponse<'cancel_order', {
        order_id: string;
        cl_ord_id: string;
        warnings: string[];
    }>;
}
