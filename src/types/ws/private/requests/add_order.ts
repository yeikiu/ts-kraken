import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/add_order | Add Order}
 * 
 * @example
 * ```ts 
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.sendPrivateRequest({ method: 'add_order', params: {
        order_type: 'limit',
        side: 'buy',
        order_qty: 0.0002,
        symbol: 'BTC/EUR',
        limit_price: 50000

    }}).then(({ order_id }) => {
        console.log({ order_id });
        
    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace AddOrder {

    /** {@inheritDoc AddOrder} */
    export type Request = BasePrivateWsRequest<'add_order', {
        order_type: 'limit' | 'market' | 'iceberg' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit' | 'settle-position';
        side: 'buy' | 'sell';
        order_qty: number;
        symbol: string;
        limit_price?: number;
        limit_price_type?: 'static' | 'pct' | 'quote';
        time_in_force?: 'gtc' | 'gtd' | 'ioc';
        margin?: boolean;
        post_only?: boolean;
        reduce_only?: boolean;
        effective_time?: string;
        expire_time?: string;
        deadline?: string;
        cl_ord_id?: string;
        order_userref?: number;
        display_qty?: number;
        fee_preference?: 'base' | 'quote';
        no_mpp?: boolean;
        stp_type?: 'cancel_newest' | 'cancel_oldest' | 'cancel_both';
        cash_order_qty?: number;
        validate?: boolean;
        sender_sub_id?: string;
        triggers?: {
            price: number;
            reference?: 'index' | 'last';
            price_type?: 'static' | 'pct' | 'quote';
        };
        conditional?: {
            order_type: 'limit' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
            limit_price?: number;
            limit_price_type?: 'static' | 'pct' | 'quote';
            trigger_price?: number;
            trigger_price_type?: 'static' | 'pct' | 'quote';
        }
    }>

    /** {@inheritDoc AddOrder} */
    export type Response = BasePrivateWsResponse<'add_order', {
        order_id: string;
        cl_ord_id: string;
        order_userref: number;
        warnings: string[];
    }>;
}
