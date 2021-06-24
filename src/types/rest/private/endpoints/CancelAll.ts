import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/cancelAllOrders */

export type Response = RESTResponse<Result>

export type Result = {
    count: number;
}
