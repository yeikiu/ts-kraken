/* https://docs.kraken.com/rest/#tag/Spot-Market-Data/operation/getTickerInformation */

export type Endpoint = 'Ticker';

export type Params = {
    pair: string;
}

export type Result = {
    [pair: string]: {
        a: string[];
        b: string[];
        c: string[];
        v: string[];
        p: string[];
        t: number[];
        l: string[];
        h: string[];
        o: string;
    }
}
