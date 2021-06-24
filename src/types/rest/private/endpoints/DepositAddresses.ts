import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getDepositAddresses */

export type Params = {
    asset: string;
    method: string;
    new?: boolean;
}

export type Response = RESTResponse<Result>

export type Result = {
    address: string;
    expiretm: string;
    new: boolean;
}[]
