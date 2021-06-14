import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/withdrawFunds */

export namespace Withdraw {
    export type Params = {
        asset: string;
        key: string;
        amount: string;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        refid: string;
    }
}
