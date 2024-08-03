/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-order | Cancel Order}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'CancelOrder',
        data: {
            txid: 'YOUR-ORDER-ID',
        }
    }).then(({ count, pending }) => {
        console.log({ count, pending });
    });
 * ```
 */
export namespace CancelOrder {

    /**
     * @ignore
     */
    export type Endpoint = 'CancelOrder';

    /** {@inheritDoc CancelOrder} */
    export type Params = {
        txid: string | number;
    } | {
        cl_ord_id: string;
    };

    /** {@inheritDoc CancelOrder} */
    export type Result = {
        count: number;
        pending: boolean;
    };
}
