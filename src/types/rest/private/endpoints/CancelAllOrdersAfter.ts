import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/cancelAllOrdersAfter */

export namespace CancelAllOrdersAfter {
    export type Params = {
        timeout: number;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        currentTime: string;
        triggerTime?: string;
    }
}
