import type { RESTResponse, RESTOrdersSnapshot } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getClosedOrders */

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
