import { ApiResponse } from '../../api_response'

export namespace GetWebSocketsToken {
    export type Response = ApiResponse<Result>

    export type Result = {
        token: string;
        expire: number;
    }
}
