import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/edit_order | Edit Order}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({
        method: 'edit_order',
        params: {
            order_id: 'YOUR-ORDER-ID',
            symbol: 'BTC/EUR',
            limit_price: 50500,
        }

    }).then(({ original_order_id, order_id, warnings }) => {
        console.log({ original_order_id, order_id, warnings });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace EditOrder {

    /** {@inheritDoc EditOrder} */
    export type Request = BasePrivateWsRequest<'edit_order', {
        order_id: string;
        symbol: string;
        deadline?: string;
        display_qty?: number;
        fee_preference?: 'base' | 'quote';
        limit_price?: number;
        no_mpp?: boolean;
        order_qty?: number;
        order_userref?: number;
        post_only?: boolean;
        reduce_only?: boolean;
        triggers?: {
            price: number;
            reference?: 'index' | 'last';
            price_type?: 'static' | 'pct' | 'quote';
        }
    }>;

    /** {@inheritDoc EditOrder} */
    export type Response = BasePrivateWsResponse<'edit_order', {
        order_id: string;
        original_order_id: string;
        warnings: string[];
    }>;
}
