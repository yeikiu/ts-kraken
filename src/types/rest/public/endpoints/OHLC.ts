/* https://docs.kraken.com/rest/#operation/getOHLCData */

export type Endpoint = 'OHLC';

export type Params = {
    pair: string;
    interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 |  21600;
    since?: number; // Return committed OHLC data since given ID
}

export type Result = {
    [pair: string]: [number, string, string, string, string, string, string, number][];
    
} & { last: number; } // Return committed OHLC data since given ID
