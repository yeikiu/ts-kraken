import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getTradeBalance */

export type Params = {
    asset?: string;
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
    ml: string;
}
