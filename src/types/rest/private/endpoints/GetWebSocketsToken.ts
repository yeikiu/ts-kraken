import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getWebsocketsToken */

export type Response = RESTResponse<Result>

export type Result = {
    token: string;
    expire: number;
}
