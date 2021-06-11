import { ApiResponse } from '../../api_response'

export namespace Assets {
    export type Params = {
        asset: string;
        aclass: string;
    }
    export type Response = ApiResponse<Result>
    export type Result = {
        [k: string]: {
            aclass: string;
            altname: string;
            decimals: number;
            display_decimals: number;
        }
    }
}
