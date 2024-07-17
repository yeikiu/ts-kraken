/* https://docs.kraken.com/rest/#operation/getWebsocketsToken */

export type Endpoint = 'GetWebSocketsToken';

export type Result = {
    token: string;
    expire: number;
}
