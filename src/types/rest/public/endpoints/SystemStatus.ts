import { RESTResponse } from '../../api_response'

export namespace SystemStatus {
    export type Params = {}
    export type Response = RESTResponse<Result>
    export type Result = {
        status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
        timestamp: string;
    }
}
