import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'
import { InjectedApiKeys } from '../../types/injected_api_keys'
import { PrivateREST } from '../../types/rest'

const createPrivateRESTClient = (apikey = process.env.KRAKEN_API_KEY || '', apiSecret = process.env.KRAKEN_API_SECRET || ''): AxiosInstance => {
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
export const privateRESTRequest = async ({ url, data }: PrivateREST.AxiosRequest, injectedApiKeys?: InjectedApiKeys): Promise<any> => {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result: krakenPrivateResponse, error: privateRESTerror }} = await apiClient.request({ url, data }) || {}
    if (privateRESTerror?.length) {
        throw new Error(privateRESTerror)
    }
    
    return krakenPrivateResponse
}
