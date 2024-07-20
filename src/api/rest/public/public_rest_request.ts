import axios, { AxiosInstance } from 'axios';
import { krakenAxiosConfig } from '../axios_config';
import { PublicEndpoint } from '$types/rest/public';
import { PublicRestTypes } from '$types';

const publicRestClient: AxiosInstance = axios.create(krakenAxiosConfig);
publicRestClient.defaults.baseURL = `${publicRestClient.defaults.baseURL}/public`;
publicRestClient.defaults.method = 'GET';

/**
 * Request against PUBLIC-REST API
 *
 * @param { url: PublicRestTypes.Endpoint; params: PublicRestTypes.Request; }
 * @returns Promise<PublicRestTypes.Result>
 */
export async function publicRestRequest<E extends PublicEndpoint>({ url, params }: PublicRestTypes.PublicRequest<E>): Promise<PublicRestTypes.PublicResult<E>> {
    const { data: { result, error } } = await publicRestClient.request<PublicRestTypes.PublicResponse<E>>({ url, params });
    if (error?.length > 0) {
        throw new Error(error?.join(' '));
    }

    return result;
}
