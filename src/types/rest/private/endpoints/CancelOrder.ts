import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/cancelOrder */

export namespace CancelOrder {
    export type Params = {
        txid: string | number;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        count: number;
        pending?: boolean;
    }
}
