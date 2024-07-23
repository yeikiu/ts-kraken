
import { privateRestRequest } from '../private_rest_request';
import { type ApiCredentials } from '$types/ws/private';

/**
 * Returns a valid token to use in our WS subscriptions and private requests
 *
 * @param injectedApiKeys - _OPTIONAL:_ If not passed, process.env keys will be used to generate a token
 * @returns wsToken string
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
