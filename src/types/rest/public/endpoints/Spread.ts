/* https://docs.kraken.com/rest/#operation/getRecentSpreads */

export type Endpoint = 'Spread';

export type Params = {
    pair: string;
    since?: number;
}

export type Result = {
    [pair: string]: [number, string, string][];
    
} & { last: number; } // ID to be used as since when polling for new spread data
