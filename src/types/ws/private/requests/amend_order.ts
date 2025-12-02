import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/amend_order | Amend Order}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({
        method: 'amend_order',
        params: {
            order_id: 'YOUR-ORDER-ID',
            order_qty: '0.14499992'
        }

    }).then(({ amend_id, order_id, warnings }) => {
        console.log({ amend_id, order_id, warnings });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace AmendOrder {

    /** {@inheritDoc AmendOrder} */
    export type Request = BasePrivateWsRequest<'amend_order', ({
        order_id: string;
        order_qty?: number;
        display_qty?: number;
        limit_price?: number;
        limit_price_type?: 'static' | 'pct' | 'quote';
        post_only?: boolean;
        trigger_price?: number;
        trigger_price_type?: 'static' | 'pct' | 'quote';
        deadline?: string;
        symbol?: string;
    } | {
        cl_order_id: string;
        order_qty?: number;
        display_qty?: number;
        limit_price?: number;
        limit_price_type?: 'static' | 'pct' | 'quote';
        post_only?: boolean;
        trigger_price?: number;
        trigger_price_type?: 'static' | 'pct' | 'quote';
        deadline?: string;
        symbol?: string;
    })>;

    /** {@inheritDoc AmendOrder} */
    export type Response = BasePrivateWsResponse<'amend_order', {
        amend_id: string;
        order_id: string;
        cl_order_id: string;
        warnings: string[];
    }>;
}
