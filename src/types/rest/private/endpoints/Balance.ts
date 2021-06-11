import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getAccountBalance */

export namespace Balance {
    export type Response = RESTResponse<Result>

    export type Result = {
        [k: string]: string;
    }
}
