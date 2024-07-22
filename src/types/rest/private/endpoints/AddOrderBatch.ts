/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/add-order-batch | Add Order Batch}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'AddOrderBatch',
        data: {
            orders: [
                {
                    close: {
                        ordertype: "stop-loss-limit",
                        price: "37000",
                        price2: "36000"
                    },
                    ordertype: "limit",
                    price: "40000",
                    price2: "string",
                    timeinforce: "GTC",
                    type: "buy",
                    cl_ord_id: "6d1b345e-2821-40e2-ad83-4ecb18a06876",
                    volume: "1.2"
                },
                {
                    ordertype: "limit",
                    price: "42000",
                    starttm: "string",
                    timeinforce: "GTC",
                    type: "sell",
                    cl_ord_id: "da8e4ad59b78481c93e589746b0cf91",
                    volume: "1.2"
                }
            ],
            pair: "BTC/USD",
            validate: false,
            deadline: "2042-09-17T14:15:22Z"
        }
    }).then(({ orders }) => {
        console.log({ orders });
    });
 * ```
 */
export type Endpoint = 'AddOrderBatch';

/** {@inheritDoc Endpoint} */
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

/** {@inheritDoc Endpoint} */
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
