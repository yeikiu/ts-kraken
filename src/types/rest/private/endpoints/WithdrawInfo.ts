import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getWithdrawalInformation */

export type Params = {
    asset: string;
    key: string;
    amount: string;
}

export type Response = RESTResponse<Result>

export type Result = {
    method: string;
    limit: string;
    amount: string;
    fee: string;
}[]
