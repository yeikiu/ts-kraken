import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion, PrivateAxiosRequest } from './axios_config'
import { stringify } from 'qs'
import { InjectedApiKeys } from '../types/injected_api_keys'

export const createPrivateRESTClient = (apikey = process.env.KRAKEN_API_KEY || '', apiSecret = process.env.KRAKEN_API_SECRET || ''): AxiosInstance => {
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

let defaultClient = createPrivateRESTClient()
export const privateRESTRequest = async ({ url, data }: PrivateAxiosRequest, injectedApiKeys?: InjectedApiKeys): Promise<any> => {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result: krakenPrivateResponse, error }} = await apiClient.request({ url, data }) || {}
    if (error?.length) {
        const errorStr = error.join(' | ')
        console.error(errorStr)
        throw new Error(errorStr)
    }
    // console.log(JSON.stringify(krakenPrivateResponse, null, 4))
    return krakenPrivateResponse
}

export const updateDefaultApiAndSecret = (apikey: string, apiSecret: string): void => {
    defaultClient = createPrivateRESTClient(apikey, apiSecret)
}

export const RESTcancelAllOrders = (injectedApiKeys?: InjectedApiKeys): Promise<{ count: number }> => privateRESTRequest({ url: 'CancelAll' }, injectedApiKeys)
