/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-all-orders | Cancel All Orders}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'CancelAll'
    }).then(({ count, pending }) => {
        console.log({ count, pending });
    });
 * ```
 */
export namespace CancelAll {

    /**
     * @ignore
     */
    export type Endpoint = 'CancelAll';

    /** {@inheritDoc CancelAll} */
    export type Result = {
        count: number;
        pending: number;
    }
}
