import { QueryTrades } from '.';

/* https://docs.kraken.com/rest/#operation/getTradeHistory */

export type Endpoint = 'TradesHistory';

export type Params = {
    type?: 'all' | 'any position' | 'closed position' | 'closing position' | 'no position';
    trades?: boolean;
    start?: number;
    end?: number;
    ofs?: number;
    consolidate_taker?: boolean;
    ledgers?: boolean;
}

export type Result = {
    trades: QueryTrades.Result;
    count: number;
}
