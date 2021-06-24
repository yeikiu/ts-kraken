import type { RESTResponse } from '../../responses_rest'

export type Response = RESTResponse<Result>

export type Result = {
    status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
    timestamp: string;
}
