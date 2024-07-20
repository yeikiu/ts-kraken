import type { ValidOhlcInterval } from '$types/rest/public'

/* https://docs.kraken.com/rest/#operation/getOHLCData */

export type Endpoint = 'OHLC';

export type Params = {
    pair: string;
    interval?: ValidOhlcInterval
    since?: number; // Return committed OHLC data since given ID
}

export type Result = {
    [pair: string]: [number, string, string, string, string, string, string, number][];
    
} & { last: number; } // Return committed OHLC data since given ID
