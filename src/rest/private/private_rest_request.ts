import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'

import type { RuntimeApiKeys, PrivateREST } from '../../types'
import { Endpoint } from '../../types/rest/private'

const createPrivateRESTClient = (apikey = process.env.KRAKEN_API_KEY, apiSecret = process.env.KRAKEN_API_SECRET): AxiosInstance => {
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

const defaultClient = createPrivateRESTClient()
/**
 * Request against PRIVATE-REST API
 *
 * @param params - { url: Endpoint; data: Request; }
 * @param { apiKey, apiSecret } - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Promise<PrivateREST.Result>
 */
export async function privateRESTRequest<E extends Endpoint>(params: PrivateREST.Request<E>, runtimeApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Result<E>> {
  const { apiKey, apiSecret } = runtimeApiKeys ?? {}
  const apiClient = (apiKey !== '' && apiSecret !== '') ? createPrivateRESTClient(apiKey, apiSecret) : defaultClient
  const { data: { result, error: privateRESTerror } } = await apiClient.request<PrivateREST.Response<E>>(params)
  if (privateRESTerror?.length > 0) {
    throw new Error(privateRESTerror.join(' '))
  }

  return result
}
