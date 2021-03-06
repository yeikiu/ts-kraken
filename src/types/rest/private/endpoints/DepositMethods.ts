import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getDepositMethods */

export type Params = {
    asset: string;
}

export type Response = RESTResponse<Result>

export type Result = {
    method: string;
    limit: string | false;
    fee: string;
    'address-setup-fee': string;
    "gen-address": boolean;
}[]
