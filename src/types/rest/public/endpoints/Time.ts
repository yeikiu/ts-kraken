import { TResponse } from '../..'

export namespace Time {
    export type Params = {}
    export type Response = TResponse<Result>
    export type Result = {
        unixtime: number;
        rfc1123: string;
    }
}
