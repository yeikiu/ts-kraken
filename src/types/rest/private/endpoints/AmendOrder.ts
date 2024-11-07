/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/amend-order | Amend Order}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'AmendOrder',
        data: { 
            txid: 'YOUR-ORDER-ID',
            order_qty: '0.14499992'
        }
    }).then(({ amend_id }) => {
        console.log({ amend_id });
    });
 * ```
 */
export namespace AmendOrder {  

    /**
     * @ignore
     */
    export type Endpoint = 'AmendOrder';

    /** {@inheritDoc AmendOrder} */
    export type Params = {
        txid?: string;
        cl_ord_id?: string;
        order_qty?: string;
        display_qty?: string;
        limit_price?: string;
        trigger_price?: string;
        post_only?: boolean;
        deadline?: string;
    }

    /** {@inheritDoc AmendOrder} */
    export type Result = {
        amend_id: string;
    }
}
