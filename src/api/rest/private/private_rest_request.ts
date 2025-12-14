import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { ApiCredentials, PrivateRestEndpoint } from '../../../types/rest/private';
import { PrivateRestTypes } from '../../..';
import { isBrowser } from '../../../util/is_browser';
import { getMessageSignature } from './message_signature';
import { apiVersion, getBaseURL, krakenAxiosBrowserConfig, krakenAxiosNodeConfig } from './../axios_config';

const createPrivateRestClient = (apiKey?: string, apiSecret?: string): AxiosInstance => {
    if (!apiKey || !apiSecret) {
        return null;
    }
    const krakenAxiosConfig = isBrowser() ? krakenAxiosBrowserConfig : krakenAxiosNodeConfig;
    const privateApiClient: AxiosInstance = axios.create(krakenAxiosConfig);
    privateApiClient.defaults.baseURL = `${getBaseURL()}/private`;
    privateApiClient.defaults.headers['API-Key'] = apiKey;
    privateApiClient.defaults.method = 'POST';

    privateApiClient.interceptors.request.use(async (config) => {
        const { url } = config;
        const nonce = new Date().getTime() * 1000;

        const payload = {
            ...config.data,
            nonce
        };
        config.headers['API-Sign'] = await getMessageSignature({
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

// Lazy initialization to avoid accessing globalThis.env at module load time
let defaultClient: AxiosInstance | null = null;
const getDefaultClient = (): AxiosInstance => {
    if (defaultClient === null) {
        defaultClient = createPrivateRestClient(globalThis.env?.KRAKEN_API_KEY, globalThis.env?.KRAKEN_API_SECRET);
    }
    return defaultClient;
};

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
    const apiClient = (apiKey && apiKey !== '' && apiSecret && apiSecret !== '') ? createPrivateRestClient(apiKey, apiSecret) : getDefaultClient();

    if (apiClient === null) {
        console.error(
            '\n%s\n\n%s\n%s\n',
            '❌ Private methods require API credentials.'
        );
        throw new Error('Auth Error');
    }

    const { data: { result, error: privateResterror } } = await apiClient.request<PrivateRestTypes.PrivateRestResponse<E>>(privateRequest);

    if (privateResterror?.length > 0) {
        throw new Error(privateResterror.join(' '));
    }

    return result;
}
