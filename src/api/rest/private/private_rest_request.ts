import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { getMessageSignature } from './message_signature';
import { apiVersion, krakenAxiosConfig } from './../axios_config';
import { PrivateEndpoint } from '$types/rest/private';
import { PrivateRestTypes } from '$types';
import { ApiCredentials } from '$types/ws/private';

const createPrivateRestClient = (apiKey = process.env.KRAKEN_API_KEY, apiSecret = process.env.KRAKEN_API_SECRET): AxiosInstance => {
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
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({ url: 'OpenOrders' })
        .then(({ open }) => {
            console.log({open});
        }).catch(error => {
            console.error({ error });
        });
 * ```
 */
export async function privateRestRequest<E extends PrivateEndpoint>(privateRequest: PrivateRestTypes.PrivateRequest<E>, runtimeApiKeys?: ApiCredentials): Promise<PrivateRestTypes.PrivateResult<E>> {
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

    const { data: { result, error: privateResterror } } = await apiClient.request<PrivateRestTypes.PrivateResponse<E>>(privateRequest);

    if (privateResterror?.length > 0) {
        throw new Error(privateResterror.join(' '));
    }

    return result;
}
