import { RESTResponse, RESTTradesInfo } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/getTradeHistory */

export namespace TradesHistory {
    export type Params = {
        type?: 'all' | 'any position' | 'closed position' | 'closing position' | 'no position';
        trades?: boolean;
        start?: number;
        end?: number;
        ofs?: number;
    }
    
    export type Response = RESTResponse<Result>

    export type Result = {
        trades: RESTTradesInfo;
        count: number;
    }
}
