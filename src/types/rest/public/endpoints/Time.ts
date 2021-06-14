import { RESTResponse } from '../../rest_response'

export namespace Time {
    export type Response = RESTResponse<Result>

    export type Result = {
        unixtime: number;
        rfc1123: string;
    }
}
