import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'

import type { RuntimeApiKeys, PrivateREST } from '../../types'

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
export async function privateRESTRequest(params: { url: 'AddExport', data: PrivateREST.Endpoints.AddExport.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.AddExport.Result>
export async function privateRESTRequest(params: { url: 'AddOrder', data: PrivateREST.Endpoints.AddOrder.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.AddOrder.Result>
export async function privateRESTRequest(params: { url: 'Balance' }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.Balance.Result>
export async function privateRESTRequest(params: { url: 'CancelAll' }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.CancelAll.Result>
export async function privateRESTRequest(params: { url: 'CancelAllOrdersAfter', data: PrivateREST.Endpoints.CancelAllOrdersAfter.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.CancelAllOrdersAfter.Result>
export async function privateRESTRequest(params: { url: 'CancelOrder', data: PrivateREST.Endpoints.CancelOrder.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.CancelOrder.Result>
export async function privateRESTRequest(params: { url: 'ClosedOrders', data: PrivateREST.Endpoints.ClosedOrders.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.ClosedOrders.Result>
export async function privateRESTRequest(params: { url: 'DepositAddresses', data: PrivateREST.Endpoints.DepositAddresses.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.DepositAddresses.Result>
export async function privateRESTRequest(params: { url: 'DepositMethods', data: PrivateREST.Endpoints.DepositMethods.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.DepositMethods.Result>
export async function privateRESTRequest(params: { url: 'DepositStatus', data: PrivateREST.Endpoints.DepositStatus.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.DepositStatus.Result>
export async function privateRESTRequest(params: { url: 'ExportStatus', data: PrivateREST.Endpoints.ExportStatus.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.ExportStatus.Result>
export async function privateRESTRequest(params: { url: 'GetWebSocketsToken' }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.GetWebSocketsToken.Result>
export async function privateRESTRequest(params: { url: 'Ledgers', data?: PrivateREST.Endpoints.Ledgers.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.Ledgers.Result>
export async function privateRESTRequest(params: { url: 'OpenOrders', data?: PrivateREST.Endpoints.OpenOrders.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.OpenOrders.Result>
export async function privateRESTRequest(params: { url: 'OpenPositions', data?: PrivateREST.Endpoints.OpenPositions.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.OpenPositions.Result>
export async function privateRESTRequest(params: { url: 'QueryLedgers', data?: PrivateREST.Endpoints.QueryLedgers.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.QueryLedgers.Result>
export async function privateRESTRequest(params: { url: 'QueryOrders', data?: PrivateREST.Endpoints.QueryOrders.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.QueryOrders.Result>
export async function privateRESTRequest(params: { url: 'QueryTrades', data?: PrivateREST.Endpoints.QueryTrades.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.QueryTrades.Result>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: PrivateREST.Endpoints.RemoveExport.DeleteParams }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.RemoveExport.DeleteResult>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: PrivateREST.Endpoints.RemoveExport.CancelParams }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.RemoveExport.CancelResult>
export async function privateRESTRequest(params: { url: 'RetrieveExport', data: PrivateREST.Endpoints.RetrieveExport.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.RetrieveExport.Result>
export async function privateRESTRequest(params: { url: 'TradeBalance', data: PrivateREST.Endpoints.TradeBalance.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.TradeBalance.Result>
export async function privateRESTRequest(params: { url: 'TradesHistory', data: PrivateREST.Endpoints.TradesHistory.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.TradesHistory.Result>
export async function privateRESTRequest(params: { url: 'TradeVolume', data: PrivateREST.Endpoints.TradeVolume.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.TradeVolume.Result>
export async function privateRESTRequest(params: { url: 'WalletTransfer', data: PrivateREST.Endpoints.WalletTransfer.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.WalletTransfer.Result>
export async function privateRESTRequest(params: { url: 'Withdraw', data: PrivateREST.Endpoints.Withdraw.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.Withdraw.Result>
export async function privateRESTRequest(params: { url: 'WithdrawCancel', data: PrivateREST.Endpoints.WithdrawCancel.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.WithdrawCancel.Result>
export async function privateRESTRequest(params: { url: 'WithdrawInfo', data: PrivateREST.Endpoints.WithdrawInfo.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.WithdrawInfo.Result>
export async function privateRESTRequest(params: { url: 'WithdrawStatus', data: PrivateREST.Endpoints.WithdrawStatus.Params }, injectedApiKeys?: RuntimeApiKeys): Promise<PrivateREST.Endpoints.WithdrawStatus.Result>

/**
 * Request against PRIVATE-REST API
 *
 * @param params - { url: Endpoint; data: Request; }
 * @param { apiKey, apiSecret } - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Promise<Result>
 */
export async function privateRESTRequest(params: PrivateREST.Request, tokenOrKeys?: RuntimeApiKeys): Promise<PrivateREST.Result> {
    const { apiKey, apiSecret } = tokenOrKeys ?? {}
    const apiClient = (apiKey && apiSecret) ? createPrivateRESTClient(apiKey, apiSecret) : defaultClient
    const { data: { result, error: privateRESTerror } } = await apiClient.request<PrivateREST.Response>(params) || {}
    if (privateRESTerror?.length) {
        throw new Error(privateRESTerror.join(' '))
    }

    return result
}
