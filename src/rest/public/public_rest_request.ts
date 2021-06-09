import axios, { AxiosInstance } from 'axios'
import { PublicREST, Assets, SystemStatus, Ticker, Time } from '../../types/rest'
import { krakenAxiosConfig } from '../axios_config'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

export async function publicRESTRequest({ url, params }: { url: 'Time', params: Time.Params }): Promise<Time.Result>
export async function publicRESTRequest({ url, params }: { url: 'SystemStatus', params: SystemStatus.Params }): Promise<SystemStatus.Result>
export async function publicRESTRequest({ url, params }: { url: 'Assets', params: Assets.Params }): Promise<Assets.Result>
export async function publicRESTRequest({ url, params }: { url: 'Ticker', params: Ticker.Params }): Promise<Ticker.Result>
export async function publicRESTRequest({ url, params }: PublicREST.AxiosRequest): Promise<PublicREST.Result> {
    const { data: { result, error }} = await publicRESTClient.request<PublicREST.Response>({ url, params })
    if (error?.length) {
        throw new Error(error?.join(' '))
    }
    return result
}
