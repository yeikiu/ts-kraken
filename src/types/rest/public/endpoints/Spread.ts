import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getRecentSpreads */

export type Params = {
    pair: string;
    since?: number;
}
export type Response = RESTResponse<Result>
export type Result = {
    [pair: string]: [number, string, string][];
    
} & { last: number; } // ID to be used as since when polling for new spread data
