import { getMessageSignature } from './message_signature'
import debugHelper from '../util/debug_helper'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { krakenAxiosConfig, apiVersion } from './axios_config'
import { PrivateEndpoint } from '../types/rest_endpoints'
import { stringify } from 'qs'
import { InjectedApiKeys } from '../types/injected_api_keys'

const { logError, debug } = debugHelper(__filename)

export const createPrivateRESTClient = (apikey = process.env.KRAKEN_API_KEY || '', apiSecret = process.env.KRAKEN_API_SECRET || ''): AxiosInstance => {
    const privateApiClient: AxiosInstance = axios.create(krakenAxiosConfig)
    privateApiClient.defaults.baseURL = `${privateApiClient.defaults.baseURL}/private`
    privateApiClient.defaults.headers['API-Key'] = apikey
    
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

interface PrivateRequestConfig extends AxiosRequestConfig {
    method?: 'POST' | 'post';
    url: PrivateEndpoint;
    data?: any;
}

let defaultClient = createPrivateRESTClient()
export const privateRESTRequest = async ({ url, data }: PrivateRequestConfig, injectedApiKeys?: InjectedApiKeys): Promise<any> => {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result: krakenPrivateResponse, error }} = await apiClient.request({ url, data }) || {}
    if (error?.length) {
        const errorStr = error.join(' | ')
        logError(errorStr)
        throw new Error(errorStr)
    }
    debug(JSON.stringify(krakenPrivateResponse, null, 4))
    return krakenPrivateResponse
}

export const updateDefaultApiAndSecret = (apikey: string, apiSecret: string): void => {
    defaultClient = createPrivateRESTClient(apikey, apiSecret)
}

export const RESTcancelAllOrders = (injectedApiKeys?: InjectedApiKeys): Promise<{ count: number }> => privateRESTRequest({ url: 'CancelAll' }, injectedApiKeys)
