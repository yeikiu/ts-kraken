import { QueryTrades } from '.';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trade-history | Get Trades History}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'TradesHistory',
        data: { trades: true, type: 'closed position' }
    }).then(({ trades, count }) => {
        console.log({ trades, count })
    });
 * ```
 */
export type Endpoint = 'TradesHistory';

/** {@inheritDoc Endpoint} */
export type Params = {
    type?: 'all' | 'any position' | 'closed position' | 'closing position' | 'no position';
    trades?: boolean;
    start?: number;
    end?: number;
    ofs?: number;
    consolidate_taker?: boolean;
    ledgers?: boolean;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    trades: QueryTrades.Result;
    count: number;
}
