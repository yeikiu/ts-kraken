import { ApiResponse } from '../../api_response'

export namespace SystemStatus {
    export type Params = {}
    export type Response = ApiResponse<Result>
    export type Result = {
        status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
        timestamp: string;
    }
}
