import type { RESTLedgerEntry } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getLedgers */

export type Endpoint = 'Ledgers';

export type Params = {
    asset?: string;
    aclass?: string;
    type?: 'all' | 'deposit' | 'withdrawal' | 'tarde' | 'margin';
    start?: number;
    end?: number;
    ofs?: number;
}

export type Result = {
    ledger: RESTLedgerEntry,
    count: number;
}
