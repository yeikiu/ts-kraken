import { ApiResponse } from '../../api_response'

export namespace Time {
    export type Params = {}
    export type Response = ApiResponse<Result>
    export type Result = {
        unixtime: number;
        rfc1123: string;
    }
}
