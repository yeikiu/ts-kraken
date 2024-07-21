/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trade-balance | Get Trade Balance}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'TradeBalance'
    }).then(({ eb: equivalentBalance }) => {
        console.log({ equivalentBalance })
    });
 * ```
 */
export type Endpoint = 'TradeBalance';

/** {@inheritDoc Endpoint} */
export type Params = {
    asset?: string;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    eb: string;
    tb: string;
    m: string;
    n: string;
    c: string;
    v: string;
    e: string;
    mf: string;
    ml: string;
    uv: string;
}
