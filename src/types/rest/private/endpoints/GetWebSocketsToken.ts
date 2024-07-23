/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-websockets-token | Get Websockets Token}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'GetWebSocketsToken'
    }).then(({ token, expires }) => {
        console.log({  token, expires });
    });
 * ```
 */
export type Endpoint = 'GetWebSocketsToken';

/** {@inheritDoc Endpoint} */
export type Result = {
    token: string;
    expires: number;
}
