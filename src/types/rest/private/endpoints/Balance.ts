/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-account-balance | Get Account Balance}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'Balance'
    }).then(({ XXBT: btcBalance, ADA: adaBalance }) => {
        console.log({ btcBalance, adaBalance })
    });
 * ```
 */
export type Endpoint = 'Balance';

/** {@inheritDoc Endpoint} */
export type Result = {
    [asset: string]: string;
}
