/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-order-batch | Cancel Order Batch}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'CancelOrderBatch',
        data: {
            orders: ["YOUR-ORDER-ID1", "YOUR-ORDER-ID2"]
        }
    }).then(({ count }) => {
        console.log({ count });
    });
 * ```
 */
export type Endpoint = 'CancelOrderBatch';

/** {@inheritDoc Endpoint} */
export type Params = {
    orders: (string | number)[];
} | {
    cl_ord_ids: string[];
};

/** {@inheritDoc Endpoint} */
export type Result = {
    count: number;
};
