/* https://docs.kraken.com/api/docs/rest-api/get-server-time */

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | Get Server Time}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({ url: 'Time' })
        .then(({ unixtime, rfc1123 }) => {
            console.log({ unixtime, rfc1123 })
        })
 * ```
 */
export type Endpoint = 'Time';

/** {@inheritDoc Endpoint} */
export type Result = {
    unixtime: number;
    rfc1123: string;
}
