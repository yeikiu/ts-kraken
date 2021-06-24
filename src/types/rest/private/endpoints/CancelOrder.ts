import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/cancelOrder */

export type Params = {
    txid: string | number;
}

export type Response = RESTResponse<Result>

export type Result = {
    count: number;
    pending?: boolean;
}
