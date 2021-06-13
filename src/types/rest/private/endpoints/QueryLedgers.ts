import { RESTResponse, RESTLedgerEntry } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getLedgers */

export namespace Ledgers {
    export type Params = {
        asset?: string;
        aclass?: string;
        type?: 'all' | 'deposit' | 'withdrawal' | 'tarde' | 'margin';
        start?: number;
        end?: number;
        ofs?: number;
    }
    
    export type Response = RESTResponse<Result>

    export type Result = {
        ledger: RESTLedgerEntry,
        count: number;
    }
}
