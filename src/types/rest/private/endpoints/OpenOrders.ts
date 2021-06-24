import type { RESTResponse, RESTOrdersSnapshot } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOpenOrders */

export type Params = {
    trades?: boolean;
    userref?: number;
}

export type Response = RESTResponse<Result>

export type Result = {
    open: RESTOrdersSnapshot
}
