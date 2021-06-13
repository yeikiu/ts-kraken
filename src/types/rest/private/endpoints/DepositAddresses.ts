import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getDepositAddresses */

export namespace DepositAddresses {
    export type Params = {
        asset: string;
        method: string;
        new?: boolean;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        address: string;
        expiretm: string;
        new: boolean;
    }[]
}
