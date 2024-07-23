import axios, { AxiosInstance } from 'axios';
import { krakenAxiosConfig } from '../axios_config';
import { PublicEndpoint } from '$types/rest/public';
import { PublicRestTypes } from '$types';

const publicRestClient: AxiosInstance = axios.create(krakenAxiosConfig);
publicRestClient.defaults.baseURL = `${publicRestClient.defaults.baseURL}/public`;
publicRestClient.defaults.method = 'GET';

/**
 * Request against `https://api.kraken.com/0/public/<Endpoint>`
 *
 */
export async function publicRestRequest<E extends PublicEndpoint>(publicRequest: PublicRestTypes.PublicRequest<E>): Promise<PublicRestTypes.PublicResult<E>> {
    const { data: { result, error } } = await publicRestClient.request<PublicRestTypes.PublicResponse<E>>(publicRequest);
    if (error?.length > 0) {
        throw new Error(error?.join(' '));
    }

    return result;
}
