/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-order | Cancel Order}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'CancelOrder',
        data: {
            txid: 'OHYO67-6LP66-HMQ437',
        }
    }).then(({ count, pending }) => {
        console.log({ count, pending });
    });
 * ```
 */
export type Endpoint = 'CancelOrder';

/** {@inheritDoc Endpoint} */
export type Params = {
    txid: string | number;
} | {
    cl_ord_id: string;
};

/** {@inheritDoc Endpoint} */
export type Result = {
    count: number;
    pending: boolean;
};
