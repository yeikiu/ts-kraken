import type { RESTResponse, RESTTradesInfo } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getTradesInfo */

export type Params = {
    txid: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
    trades?: boolean;
}

export type Response = RESTResponse<Result>

export type Result = RESTTradesInfo
