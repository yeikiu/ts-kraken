/* https://docs.kraken.com/rest/#operation/getOrderBook */

export type Endpoint = 'Depth';

export type Params = {
    pair: string;
    count?: number; // maximum number of asks/bids: 1 .. 500
}

export type Result = {
    [pair: string]: {
        asks: [string, string, number];
        bids: [string, string, number];
    }
}
