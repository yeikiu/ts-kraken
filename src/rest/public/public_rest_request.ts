import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig } from '../axios_config'

import type { PublicREST } from '../../types'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

export async function publicRESTRequest (req: { url: 'AssetPairs', params?: PublicREST.Endpoints.AssetPairs.Params }): Promise<PublicREST.Endpoints.AssetPairs.Result>
export async function publicRESTRequest (req: { url: 'Assets', params?: PublicREST.Endpoints.Assets.Params }): Promise<PublicREST.Endpoints.Assets.Result>
export async function publicRESTRequest (req: { url: 'Depth', params: PublicREST.Endpoints.Depth.Params }): Promise<PublicREST.Endpoints.Depth.Result>
export async function publicRESTRequest (req: { url: 'OHLC', params: PublicREST.Endpoints.OHLC.Params }): Promise<PublicREST.Endpoints.OHLC.Result>
export async function publicRESTRequest (req: { url: 'Spread', params: PublicREST.Endpoints.Spread.Params }): Promise<PublicREST.Endpoints.Spread.Result>
export async function publicRESTRequest (req: { url: 'SystemStatus' }): Promise<PublicREST.Endpoints.SystemStatus.Result>
export async function publicRESTRequest (req: { url: 'Ticker', params: PublicREST.Endpoints.Ticker.Params }): Promise<PublicREST.Endpoints.Ticker.Result>
export async function publicRESTRequest (req: { url: 'Time' }): Promise<PublicREST.Endpoints.Time.Result>
export async function publicRESTRequest (req: { url: 'Trades', params: PublicREST.Endpoints.Trades.Params }): Promise<PublicREST.Endpoints.Trades.Result>

/**
 * Request against PUBLIC-REST API
 *
 * @param params - { url: PublicREST.Endpoint; params: PublicREST.Request; }
 * @returns Promise<PublicREST.Result>
 */
export async function publicRESTRequest ({ url, params }: PublicREST.Request): Promise<PublicREST.Result> {
  const { data: { result, error } } = await publicRESTClient.request<PublicREST.Response>({ url, params })
  if (error?.length > 0) {
    throw new Error(error?.join(' '))
  }
  return result
}
