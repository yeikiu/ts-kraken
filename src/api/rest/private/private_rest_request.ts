import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { ApiCredentials, PrivateRestEndpoint } from '../../../types/rest/private';
import { PrivateRestTypes } from '../../..';
import { getMessageSignature } from './message_signature';
import { apiVersion, krakenAxiosConfig } from './../axios_config';

const createPrivateRestClient = (apiKey = globalThis.env.KRAKEN_API_KEY, apiSecret = globalThis.env.KRAKEN_API_SECRET): AxiosInstance => {
    if (!apiKey || !apiSecret) {
        return null;
    }

    const privateApiClient: AxiosInstance = axios.create(krakenAxiosConfig);
    privateApiClient.defaults.baseURL = `${privateApiClient.defaults.baseURL}/private`;
    privateApiClient.defaults.headers['API-Key'] = apiKey;
    privateApiClient.defaults.method = 'POST';

    privateApiClient.interceptors.request.use((config) => {
        const { url } = config;
        const nonce = new Date().getTime() * 1000;

        const payload = {
            ...config.data,
            nonce
        };
        config.headers['API-Sign'] = getMessageSignature({
            path: `/${apiVersion}/private/${url}`,
            payload,
            nonce,
            apiSecret
        });
        delete config.params;
        config.data = stringify(payload);

        return config;
    });

    return privateApiClient;
};

const defaultClient = createPrivateRestClient();

/**
 * Sends a Rest request to a private Endpoint @ `https://api.kraken.com/0/private/<Endpoint>`
 * 
 * @example
 * ```ts
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({ url: 'OpenOrders' })
        .then(({ open }) => {
            console.log({open});
        }).catch(error => {
            console.error({ error });
        });
 * ```
 */
export async function privateRestRequest<E extends PrivateRestEndpoint>(privateRequest: PrivateRestTypes.PrivateRestRequest<E>, runtimeApiKeys?: ApiCredentials): Promise<PrivateRestTypes.PrivateRestResult<E>> {
    const { apiKey, apiSecret } = runtimeApiKeys ?? {};
    const apiClient = (apiKey !== '' && apiSecret !== '') ? createPrivateRestClient(apiKey, apiSecret) : defaultClient;

    if (apiClient === null) {
        console.error(
            '\n%s\n\n%s\n%s\n',
            '❌ Private methods require API credentials.',
            'You can learn more about configuring ts-kraken to access private methods here:',
            '   👉 https://github.com/yeikiu/ts-kraken#demo-playground-snippet'
        );
        throw new Error('Auth Error');
    }

    const { data: { result, error: privateResterror } } = await apiClient.request<PrivateRestTypes.PrivateRestResponse<E>>(privateRequest);

    if (privateResterror?.length > 0) {
        throw new Error(privateResterror.join(' '));
    }

    return result;
}
