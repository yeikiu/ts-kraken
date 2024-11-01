/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/add-order | Add Order}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'AddOrder',
        data: { 
            ordertype: "limit",
            type: "buy",
            volume: "0.0002",
            pair: "XBTUSD",
            price: "57500"
        }
    }).then(({ txid, descr: { order }}) => {
        console.log({ txid, order });
    });
 * ```
 */
export namespace AddOrder {  

    /**
     * @ignore
     */
    export type Endpoint = 'AddOrder';

    /** {@inheritDoc AddOrder} */
    export type Params = {
        userref?: number;
        cl_ord_id?: string;
        ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
        type: 'buy' | 'sell';
        volume: string;
        displayvol?: string;
        pair: string; // Asset pair id or altname
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
        close?: {
            ordertype?: 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
            price?: string;
            price2?: string;
        };
        deadline?: string;
        validate?: boolean;
    }

    /** {@inheritDoc AddOrder} */
    export type Result = {
        txid: string[];
        descr: {
            order: string;
            close: string;
        };
        validation: string;
    }
}
