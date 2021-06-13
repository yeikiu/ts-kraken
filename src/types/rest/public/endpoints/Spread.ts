import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getRecentSpreads */

export namespace Spread {
    export type Params = {
        pair: string;
        since?: number;
    }
    export type Response = RESTResponse<Result>
    export type Result = {
        [pair: string]: [number, string, string][];
        
    } & { last: number; } // ID to be used as since when polling for new spread data
}
