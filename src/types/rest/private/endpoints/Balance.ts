import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getAccountBalance */

export type Response = RESTResponse<Result>

export type Result = {
    [asset: string]: string;
}
