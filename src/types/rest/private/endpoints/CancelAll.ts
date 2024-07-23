/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-all-orders | Cancel All Orders}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'CancelAll'
    }).then(({ count, pending }) => {
        console.log({ count, pending });
    });
 * ```
 */
export type Endpoint = 'CancelAll';

/** {@inheritDoc Endpoint} */
export type Result = {
    count: number;
    pending: number;
}
