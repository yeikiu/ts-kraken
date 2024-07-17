import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig } from '../axios_config'

import type { PublicREST } from '../../types'
import { Endpoint } from '../../types/rest/public'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

/**
 * Request against PUBLIC-REST API
 *
 * @param { url: PublicREST.Endpoint; params: PublicREST.Request; }
 * @returns Promise<PublicREST.Result>
 */
export async function publicRESTRequest<E extends Endpoint>({ url, params }: PublicREST.Request<E>): Promise<PublicREST.Result<E>> {
  const { data: { result, error } } = await publicRESTClient.request<PublicREST.Response<E>>({ url, params })
  if (error?.length > 0) {
    throw new Error(error?.join(' '))
  }
  return result
}
