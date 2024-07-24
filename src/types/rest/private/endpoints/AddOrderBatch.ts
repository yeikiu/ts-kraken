/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/add-order-batch | Add Order Batch}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'AddOrderBatch',
        data: {
            pair: 'BTC/EUR',
            orders: [{
                ordertype: 'limit',
                type: 'buy',
                volume: '0.0002',
                price: '50000'
            },{
                ordertype: 'limit',
                type: 'sell',
                volume: '0.0002',
                price: '70000'
            }]
        }
    }).then(({ orders }) => {
        console.log({ orders });
    });
 * ```
 */
export namespace AddOrderBatch {

    /**
     * @ignore
     */
    export type Endpoint = 'AddOrderBatch';

    /** {@inheritDoc AddOrderBatch} */
    export type Params = {
        pair: string; // Asset pair id or altname
        deadline?: string;
        validate?: boolean;
        orders: {
            userref?: number;
            cl_ord_id?: string;
            ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
            type: 'buy' | 'sell';
            volume: string;
            displayvol?: string;
            price?: string;
            price2?: string;
            trigger?: 'last' | 'index';
            leverage?: string;
            reduce_only?: boolean;
            stptype?: 'cancel-newest' | 'cancel-oldest' | 'cancel-both';
            oflags?: string;
            timeinforce?: 'GTC' | 'IOC' | 'GTD';
            starttm?: string;
            expiretm?: string;
            // TODO: review missing close[ordertype], close[price] and close[price2] fields from `AddOrder`
            close?: {
                ordertype?: 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
                price?: string;
                price2?: string;
            }
        }[];
    }

    /** {@inheritDoc AddOrderBatch} */
    export type Result = {
        orders: {
            txid: string[];
            descr: {
                order: string;
                // close: string;
            };
            close: string; // TODO: review this field. Docs show it here for `AddOrderBatch` and under `descr` for `AddOrder`
            error: string;
        }[];
    };
}
