import { PublicREST } from '..'
import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/getAssetInfo */

export namespace Assets {
    export type Params = {
        asset: string;
        aclass: string;
    }
    
    export type Response = RESTResponse<Result>

    export type Result = {
        [asset: string]: {
            aclass: string;
            altname: string;
            decimals: number;
            display_decimals: number;
        }
    }
}
