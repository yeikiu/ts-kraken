import axios, { AxiosInstance } from 'axios'
import { Time, Ticker, Assets, PublicREST, SystemStatus } from '../../types/rest/public'
import { krakenAxiosConfig } from '../axios_config'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

export async function publicRESTRequest(req: { url: 'Time' }): Promise<Time.Result>
export async function publicRESTRequest(req: { url: 'Ticker', params: Ticker.Params }): Promise<Ticker.Result>
export async function publicRESTRequest(req: { url: 'SystemStatus' }): Promise<SystemStatus.Result>
export async function publicRESTRequest(req: { url: 'Assets', params: Assets.Params }): Promise<Assets.Result>
export async function publicRESTRequest({ url, params }: PublicREST.Request): Promise<PublicREST.Result> {
    const { data: { result, error }} = await publicRESTClient.request<PublicREST.Response>({ url, params })
    if (error?.length) {
        throw new Error(error?.join(' '))
    }
    return result
}
