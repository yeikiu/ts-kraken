import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/cancelWithdrawal */

export type Params = {
    asset: string;
    refid: string;
}

export type Response = RESTResponse<Result>

export type Result = boolean;
