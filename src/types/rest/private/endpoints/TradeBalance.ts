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
        eb: string; // equivalent balance
        tb: string; // trade balance
        m: string; // margin amount of open positions
        n: string; // unrealized net profit/loss of open positions
        c: string; // cost basis of open positions
        v: string; // current floating valuation of open positions
        e: string; // equity
        mf: string; // free margin
        mfo?: string; // margin free for orders
        ml?: string; // margin level; only present when margin positions are open
        uv?: string; // unexecuted value
    }
}
