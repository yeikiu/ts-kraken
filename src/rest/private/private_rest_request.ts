import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'
import { ClosedOrders, GetWebSocketsToken, OpenOrders, PrivateREST } from '../../types/rest/private'

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
export async function privateRESTRequest({ url }: { url: 'Balance' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<any>
export async function privateRESTRequest({ url, data }: { url: 'ClosedOrders', data?: ClosedOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<ClosedOrders.Result>
export async function privateRESTRequest({ url, data }: { url: 'OpenOrders', data?: OpenOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<OpenOrders.Result>
export async function privateRESTRequest({ url }: { url: 'GetWebSocketsToken' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<GetWebSocketsToken.Result>
export async function privateRESTRequest({ url, data }: PrivateREST.Request, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<PrivateREST.Result> {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result, error: privateRESTerror }} = await apiClient.request<PrivateREST.Response>({ url, data }) || {}
    if (privateRESTerror?.length) {
        throw new Error(privateRESTerror.join(' '))
    }
    
    return result
}
