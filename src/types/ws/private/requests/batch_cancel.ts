import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/batch_cancel | Batch Cancel}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({
        method: 'batch_cancel',
        params: { orders: ['YOUR-ORDER-ID1', 'YOUR-ORDER-ID2'] }

    }).then(({orders_cancelled}) => {
        console.log({ orders_cancelled });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace BatchCancel {

    /** {@inheritDoc BatchCancel} */
    export type Request = BasePrivateWsRequest<'batch_cancel', {
        orders: string[];
        cl_ord_id?: string[];
    }>;

    /** {@inheritDoc BatchCancel} */
    export type Response = BasePrivateWsResponse<'batch_cancel', {
        orders_cancelled: number; // TODO: reported this is documented as `count`
        // warnings: string[];
    }>;
}
