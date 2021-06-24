import type { ValidOHLCInterval } from '../../..'
import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOHLCData */

export type Params = {
    pair: string;
    interval?: ValidOHLCInterval
    since?: number; // Return committed OHLC data since given ID
}

export type Response = RESTResponse<Result>

export type Result = {
    [pair: string]: [number, string, string, string, string, string, string, number][];
    
} & { last: number; } // Return committed OHLC data since given ID
