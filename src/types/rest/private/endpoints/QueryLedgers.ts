import type { RESTLedgerEntry } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getLedgersInfo */

export type Endpoint = 'QueryLedgers';

export type Params = {
    id?: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
    trades?: boolean;
}

export type Result = RESTLedgerEntry;
