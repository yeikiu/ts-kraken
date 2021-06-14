import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/cancelWithdrawal */

export namespace WithdrawCancel {
    export type Params = {
        asset: string;
        refid: string;
    }

    export type Response = RESTResponse<Result>

    export type Result = boolean;
}
