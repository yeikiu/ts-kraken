import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/cancelAllOrdersAfter */

export type Params = {
    timeout: number;
}

export type Response = RESTResponse<Result>

export type Result = {
    currentTime: string;
    triggerTime?: string;
}
