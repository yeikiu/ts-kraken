import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/getAccountBalance */

export namespace Balance {
    export type Response = RESTResponse<Result>

    export type Result = {
        [asset: string]: string;
    }
}
