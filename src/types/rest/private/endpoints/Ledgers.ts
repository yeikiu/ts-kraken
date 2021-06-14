import { RESTResponse, RESTLedgerEntry } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/getLedgersInfo */

export namespace QueryLedgers {
    export type Params = {
        id?: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
        trades?: boolean;
    }
    
    export type Response = RESTResponse<Result>

    export type Result = RESTLedgerEntry;
}
