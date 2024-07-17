/* https://docs.kraken.com/rest/#operation/getRecentTrades */

export type Endpoint = 'Trades';

export type Params = {
    pair: string;
    since?: number;
}

export type Result = {
    [pair: string]: [string, string, number, string, string, string][];
    
} & { last: string; } // ID to be used as since when polling for new trade data
