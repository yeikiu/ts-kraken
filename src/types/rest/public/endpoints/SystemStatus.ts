import { RESTResponse } from '../../rest_response'

export namespace SystemStatus {
    export type Response = RESTResponse<Result>

    export type Result = {
        status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
        timestamp: string;
    }
}
