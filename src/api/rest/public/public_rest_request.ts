import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig } from '../axios_config'
import { Endpoint } from '$types/rest/public'
import { PublicRest } from '$types'

const publicRestClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRestClient.defaults.baseURL = `${publicRestClient.defaults.baseURL}/public`
publicRestClient.defaults.method = 'GET'

/**
 * Request against PUBLIC-REST API
 *
 * @param { url: PublicRest.Endpoint; params: PublicRest.Request; }
 * @returns Promise<PublicRest.Result>
 */
export async function publicRestRequest<E extends Endpoint>({ url, params }: PublicRest.Request<E>): Promise<PublicRest.Result<E>> {
    const { data: { result, error } } = await publicRestClient.request<PublicRest.Response<E>>({ url, params })
    if (error?.length > 0) {
        throw new Error(error?.join(' '))
    }

    return result
}
