import { RESTResponse } from '../../api_response'

export namespace Ticker {
    export type Params = {
        pair: string;
    }

    export type Response = RESTResponse<Result>
    
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
