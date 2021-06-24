import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/withdrawFunds */

export type Params = {
    asset: string;
    key: string;
    amount: string;
}

export type Response = RESTResponse<Result>

export type Result = {
    refid: string;
}
