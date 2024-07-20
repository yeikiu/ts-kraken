import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig } from '../axios_config'
import { Endpoint } from '$types/rest/public'
import { PublicRestTypes } from '$types'

const publicRestClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRestClient.defaults.baseURL = `${publicRestClient.defaults.baseURL}/public`
publicRestClient.defaults.method = 'GET'

/**
 * Request against PUBLIC-REST API
 *
 * @param { url: PublicRestTypes.Endpoint; params: PublicRestTypes.Request; }
 * @returns Promise<PublicRestTypes.Result>
 */
export async function publicRestRequest<E extends Endpoint>({ url, params }: PublicRestTypes.Request<E>): Promise<PublicRestTypes.Result<E>> {
    const { data: { result, error } } = await publicRestClient.request<PublicRestTypes.Response<E>>({ url, params })
    if (error?.length > 0) {
        throw new Error(error?.join(' '))
    }

    return result
}
