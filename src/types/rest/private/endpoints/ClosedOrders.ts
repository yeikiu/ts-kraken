import { RESTResponse, RESTOrdersSnapshot } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getClosedOrders */

export namespace ClosedOrders {
    export type Params = {
        trades?: boolean;
        userref?: number;
        start?: number;
        end?: number;
        ofs?: number;
        closetime?: 'open' | 'close' | 'both';
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        closed: RESTOrdersSnapshot
    }
}
