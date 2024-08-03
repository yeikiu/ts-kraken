import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/batch_add | Batch Add}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';
        
    privateWsRequest({
        method: 'batch_add',
        params: {
            symbol: 'BTC/EUR',
            orders: [{
                order_type: 'limit',
                side: 'buy',
                order_qty: 0.0002,
                limit_price: 50000
            },{
                order_type: 'limit',
                side: 'sell',
                order_qty: 0.0002,
                limit_price: 70000
            }]
        }
    }).then(([{ order_id: order1 }, { order_id: order2 }]) => {
        console.log({ order1, order2 });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace BatchAdd {

    /** {@inheritDoc BatchAdd} */
    export type Request = BasePrivateWsRequest<'batch_add', {
        symbol: string;
        deadline?: string;
        validate?: boolean;
        orders: {
            side: 'buy' | 'sell';
            order_qty: number;
            order_type: 'limit' | 'market' | 'iceberg' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit' | 'settle-position';
            cash_order_qty?: number;
            conditional?: {
                order_type: 'limit' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
                limit_price?: number;
                limit_price_type?: 'static' | 'pct' | 'quote';
                trigger_price?: number;
                trigger_price_type?: 'static' | 'pct' | 'quote';
            }
            display_qty?: number;
            effective_time?: string;
            expire_time?: string;
            fee_preference?: 'base' | 'quote';
            limit_price?: number;
            limit_price_type?: 'static' | 'pct' | 'quote';
            margin?: boolean;
            no_mpp?: boolean;
            cl_ord_id?: string;
            order_userref?: number;
            post_only?: boolean;
            reduce_only?: boolean;
            stp_type?: 'cancel_newest' | 'cancel_oldest' | 'cancel_both';
            time_in_force?: 'gtc' | 'gtd' | 'ioc';
            triggers?: {
                price: number;
                reference?: 'index' | 'last';
                price_type?: 'static' | 'pct' | 'quote';
            };
            sender_sub_id?: string;
        }[];
    }>;

    /** {@inheritDoc BatchAdd} */
    export type Response = BasePrivateWsResponse<'batch_add', {
        order_id: string;
        cl_ord_id: string;
        order_userref: number;
        warnings: string[];
        validation: string;
    }[]>;
}
