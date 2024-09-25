/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-websockets-token | Get Websockets Token}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'GetWebSocketsToken'
    }).then(({ token, expires }) => {
        console.log({  token, expires });
    });
 * ```
 */
export namespace GetWebSocketsToken {

    /**
     * @ignore
     */
    export type Endpoint = 'GetWebSocketsToken';

    /** {@inheritDoc GetWebSocketsToken} */
    export type Result = {
        token: string;
        expires: number;
    }
}
