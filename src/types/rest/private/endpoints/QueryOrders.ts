import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOrdersInfo */

export type Params = {
    txid: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
    trades?: boolean;
    userref?: number;
}

export type Response = RESTResponse<Result>

export type Result = {
    eb: string;
    tb: string;
    m: string;
    n: string;
    c: string;
    v: string;
    e: string;
    mf: string;
}
