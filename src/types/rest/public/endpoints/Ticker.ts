import { TResponse } from '../..'

export namespace Ticker {
    export type Params = {
        pair: string;
    }

    export type Response = TResponse<Result>
    
    export type Result = {
        [k: string]: {
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
}
