import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'
import { Balance, ClosedOrders, GetWebSocketsToken, OpenOrders, PrivateREST } from '../../types/rest/private'
import { RemoveExport } from '../../types/rest/private/endpoints/RemoveExport'
import { RetrieveExport } from '../../types/rest/private/endpoints/RetrieveExport'

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
export async function privateRESTRequest(params: { url: 'Balance' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<Balance.Result>
export async function privateRESTRequest(params: { url: 'ClosedOrders', data?: ClosedOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<ClosedOrders.Result>
export async function privateRESTRequest(params: { url: 'OpenOrders', data?: OpenOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<OpenOrders.Result>
export async function privateRESTRequest(params: { url: 'GetWebSocketsToken' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<GetWebSocketsToken.Result>

export async function privateRESTRequest(params: { url: 'RetrieveExport', data: RetrieveExport.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RetrieveExport.Result>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: RemoveExport.DeleteParams }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RemoveExport.DeleteResult>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: RemoveExport.CancelParams }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RemoveExport.CancelResult>

export async function privateRESTRequest(params: PrivateREST.Request, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<PrivateREST.Result> {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result, error: privateRESTerror }} = await apiClient.request<PrivateREST.Response>(params) || {}
    if (privateRESTerror?.length) {
        throw new Error(privateRESTerror.join(' '))
    }
    
    return result
}
