import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'

import type { PrivateRest } from '../../types'
import { Endpoint } from '../../types/rest/private'
import { ApiCredentials } from '../../types/ws/private'

const createPrivateRestClient = (apikey = process.env.KRAKEN_API_KEY, apiSecret = process.env.KRAKEN_API_SECRET): AxiosInstance => {
  const privateApiClient: AxiosInstance = axios.create(krakenAxiosConfig)
  privateApiClient.defaults.baseURL = `${privateApiClient.defaults.baseURL}/private`
  privateApiClient.defaults.headers['API-Key'] = apikey
  privateApiClient.defaults.method = 'POST'

  privateApiClient.interceptors.request.use((config) => {
    const { url } = config
    const nonce = new Date().getTime() * 1000

    const payload = {
      ...config.data,
      nonce
    }
    config.headers['API-Sign'] = getMessageSignature({
      path: `/${apiVersion}/private/${url}`,
      payload,
      nonce,
      apiSecret
    })
    delete config.params
    config.data = stringify(payload)

    return config
  })

  return privateApiClient
}

const defaultClient = createPrivateRestClient()
/**
 * Request against PRIVATE-REST API
 *
 * @param params - { url: Endpoint; data: Request; }
 * @param { apiKey, apiSecret } - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Promise<PrivateRest.Result>
 */
export async function privateRestRequest<E extends Endpoint>(params: PrivateRest.Request<E>, runtimeApiKeys?: ApiCredentials): Promise<PrivateRest.Result<E>> {
  const { apiKey, apiSecret } = runtimeApiKeys ?? {}
  const apiClient = (apiKey !== '' && apiSecret !== '') ? createPrivateRestClient(apiKey, apiSecret) : defaultClient
  const { data: { result, error: privateResterror } } = await apiClient.request<PrivateRest.Response<E>>(params)
  if (privateResterror?.length > 0) {
    throw new Error(privateResterror.join(' '))
  }

  return result
}
