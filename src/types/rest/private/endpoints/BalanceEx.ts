/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-extended-balance | Get Extended Balance}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'BalanceEx'
    }).then(({ XXBT: btcBalance, ADA: adaBalance }) => {
        console.log({ btcBalance, adaBalance })
    });
 * ```
 */
export type Endpoint = 'BalanceEx';

/** {@inheritDoc Endpoint} */
export type Result = {
    [asset: string]: {
        balance: string;
        credit: string;
        credit_used: string;
        hold_trade: string;
    };
}
