import { TResponse } from '../..'

export namespace SystemStatus {
    export type Params = {}
    export type Response = TResponse<Result>
    export type Result = {
        status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
        timestamp: string;
    }
}
