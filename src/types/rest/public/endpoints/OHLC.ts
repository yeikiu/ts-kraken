import { ValidOHLCInterval } from '../../..'
import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getOHLCData */

export namespace OHLC {
    export type Params = {
        pair: string;
        interval?: ValidOHLCInterval
        since?: number; // Return committed OHLC data since given ID
    }
    export type Response = RESTResponse<Result>
    export type Result = {
        [pair: string]: [number, string, string, string, string, string, string, number][];
        
    } & { last: number; } // Return committed OHLC data since given ID
}
