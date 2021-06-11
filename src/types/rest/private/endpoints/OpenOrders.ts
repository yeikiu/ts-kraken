import { RESTResponse, RESTOrdersSnapshot } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getOpenOrders */

export namespace OpenOrders {
    export type Params = {
        trades?: boolean;
        userref?: number;
    }
    
    export type Response = RESTResponse<Result>

    export type Result = {
        open: RESTOrdersSnapshot
    }
}
