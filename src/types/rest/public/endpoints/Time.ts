import type { RESTResponse } from '../../responses_rest'

export type Response = RESTResponse<Result>

export type Result = {
    unixtime: number;
    rfc1123: string;
}
