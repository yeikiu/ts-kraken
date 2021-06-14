import { RESTResponse } from '../../rest_response'

/* https://docs.kraken.com/rest/#operation/getWebsocketsToken */

export namespace GetWebSocketsToken {
    export type Response = RESTResponse<Result>

    export type Result = {
        token: string;
        expire: number;
    }
}
