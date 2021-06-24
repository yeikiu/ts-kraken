import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOrderBook */

export type Params = {
    pair: string;
    count?: number; // maximum number of asks/bids: 1 .. 500
}
export type Response = RESTResponse<Result>
export type Result = {
    [pair: string]: {
        asks: [string, string, number];
        bids: [string, string, number];
    }
}
