import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { getMessageSignature } from './message_signature';
import { apiVersion, krakenAxiosConfig } from './../axios_config';
import { PrivateEndpoint } from '$types/rest/private';
import { PrivateRestTypes } from '$types';
import { ApiCredentials } from '$types/ws/private';

const createPrivateRestClient = (apikey = process.env.KRAKEN_API_KEY, apiSecret = process.env.KRAKEN_API_SECRET): AxiosInstance => {
    const privateApiClient: AxiosInstance = axios.create(krakenAxiosConfig);
    privateApiClient.defaults.baseURL = `${privateApiClient.defaults.baseURL}/private`;
    privateApiClient.defaults.headers['API-Key'] = apikey;
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
 * Request against `https://api.kraken.com/0/private/<Endpoint>`
 *
 */
export async function privateRestRequest<E extends PrivateEndpoint>(privateRequest: PrivateRestTypes.PrivateRequest<E>, runtimeApiKeys?: ApiCredentials): Promise<PrivateRestTypes.PrivateResult<E>> {
    const { apiKey, apiSecret } = runtimeApiKeys ?? {};
    const apiClient = (apiKey !== '' && apiSecret !== '') ? createPrivateRestClient(apiKey, apiSecret) : defaultClient;
    const { data: { result, error: privateResterror } } = await apiClient.request<PrivateRestTypes.PrivateResponse<E>>(privateRequest);

    if (privateResterror?.length > 0) {
        throw new Error(privateResterror.join(' '));
    }

    return result;
}
