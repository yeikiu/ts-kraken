import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getRecentTrades */

export type Params = {
    pair: string;
    since?: number;
}
export type Response = RESTResponse<Result>
export type Result = {
    [pair: string]: [string, string, number, string, string, string][];
    
} & { last: string; } // ID to be used as since when polling for new trade data
