/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trade-balance | Get Trade Balance}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'TradeBalance'
    }).then(({ eb: equivalentBalance }) => {
        console.log({ equivalentBalance })
    });
 * ```
 */
export namespace TradeBalance {

    /**
     * @ignore
     */
    export type Endpoint = 'TradeBalance';

    /** {@inheritDoc TradeBalance} */
    export type Params = {
        asset?: string;
    }

    /** {@inheritDoc TradeBalance} */
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
}
