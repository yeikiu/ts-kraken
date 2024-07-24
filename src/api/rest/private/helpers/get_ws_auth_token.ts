
import { privateRestRequest } from '../private_rest_request';
import { type ApiCredentials } from '$types/ws/private';

/**
 * Returns a token string required for WebsocketV2 usage. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-websockets-token | Get Websockets Token}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.getWsAuthToken().then(wsToken => {
        console.log({ wsToken });
    });
 * ```
 * @remarks
 * You don't need to generate this token to use any method from {@link PrivateWs} as it will automatically inject one for you.
 */
export const getWsAuthToken = async (injectedApiKeys?: ApiCredentials): Promise<string> => {
    try {
        const { token } = await privateRestRequest({ url: 'GetWebSocketsToken' }, injectedApiKeys) || {};
        if (!token) {
            throw ({ code: 'CUSTOM_ERROR', message: 'no token received' });
        }

        return token;

    } catch ({ code, message }) {
        console.error('Kraken getWsAuthToken error', { code, message });
        throw ({ code, message });
    }
};
