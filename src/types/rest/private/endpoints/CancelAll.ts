import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/cancelAllOrders */

export namespace CancelAll {
    export type Response = RESTResponse<Result>

    export type Result = {
        count: number;
    }
}