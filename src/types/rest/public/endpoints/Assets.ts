import { TResponse } from '../..'

export namespace Assets {
    export type Params = {
        asset: string;
        aclass: string;
    }
    export type Response = TResponse<Result>
    export type Result = {
        [k: string]: {
            aclass: string;
            altname: string;
            decimals: number;
            display_decimals: number;
        }
    }
}
