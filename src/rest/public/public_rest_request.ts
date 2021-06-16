import axios, { AxiosInstance } from 'axios'
import { Assets, PublicREST, AssetPairs, Depth, Spread, SystemStatus, Ticker, Time, OHLC } from '../../types/rest/public'
import { Trades } from '../../types/rest/public/endpoints/Trades'
import { krakenAxiosConfig } from '../axios_config'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

export async function publicRESTRequest(req: { url: 'AssetPairs', params?: AssetPairs.Params }): Promise<AssetPairs.Result>
export async function publicRESTRequest(req: { url: 'Assets', params?: Assets.Params }): Promise<Assets.Result>
export async function publicRESTRequest(req: { url: 'Depth', params: Depth.Params }): Promise<Depth.Result>
export async function publicRESTRequest(req: { url: 'OHLC', params: OHLC.Params }): Promise<OHLC.Result>
export async function publicRESTRequest(req: { url: 'Spread', params: Spread.Params }): Promise<Spread.Result>
export async function publicRESTRequest(req: { url: 'SystemStatus' }): Promise<SystemStatus.Result>
export async function publicRESTRequest(req: { url: 'Ticker', params: Ticker.Params }): Promise<Ticker.Result>
export async function publicRESTRequest(req: { url: 'Time' }): Promise<Time.Result>
export async function publicRESTRequest(req: { url: 'Trades', params: Trades.Params }): Promise<Trades.Result>

/**
 * Request against PUBLIC-REST API
 *
 * @param params - { url: PublicREST.Endpoint; params: PublicREST.Request; }
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Promise<PrivateREST.Result>
 */
export async function publicRESTRequest({ url, params }: PublicREST.Request): Promise<PublicREST.Result> {
    const { data: { result, error }} = await publicRESTClient.request<PublicREST.Response>({ url, params })
    if (error?.length) {
        throw new Error(error?.join(' '))
    }
    return result
}
