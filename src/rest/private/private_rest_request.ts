import { getMessageSignature } from './message_signature'
import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, apiVersion } from './../axios_config'
import { stringify } from 'qs'
import { Balance, ClosedOrders, GetWebSocketsToken, Ledgers, OpenOrders, OpenPositions, PrivateREST, QueryLedgers, QueryOrders, QueryTrades, TradeBalance, TradesHistory, TradeVolume, WalletTransfer, Withdraw, WithdrawCancel, WithdrawInfo, WithdrawStatus } from '../../types/rest/private'
import { RemoveExport } from '../../types/rest/private/endpoints/RemoveExport'
import { RetrieveExport } from '../../types/rest/private/endpoints/RetrieveExport'
import { AddExport } from '../../types/rest/private/endpoints/AddExport'
import { AddOrder } from '../../types/rest/private/endpoints/AddOrder'
import { CancelAll } from '../../types/rest/private/endpoints/CancelAll'
import { CancelAllOrdersAfter } from '../../types/rest/private/endpoints/CancelAllOrdersAfter'
import { CancelOrder } from '../../types/rest/private/endpoints/CancelOrder'
import { DepositAddresses } from '../../types/rest/private/endpoints/DepositAddresses'
import { DepositStatus } from '../../types/rest/private/endpoints/DepositStatus'
import { DepositMethods } from '../../types/rest/private/endpoints/DepositMethods'
import { ExportStatus } from '../../types/rest/private/endpoints/ExportStatus'

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
export async function privateRESTRequest(params: { url: 'AddExport', data: AddExport.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<AddExport.Result>
export async function privateRESTRequest(params: { url: 'AddOrder', data: AddOrder.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<AddOrder.Result>
export async function privateRESTRequest(params: { url: 'Balance' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<Balance.Result>
export async function privateRESTRequest(params: { url: 'CancelAll' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<CancelAll.Result>
export async function privateRESTRequest(params: { url: 'CancelAllOrdersAfter', data: CancelAllOrdersAfter.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<CancelAllOrdersAfter.Result>
export async function privateRESTRequest(params: { url: 'CancelOrder', data: CancelOrder.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<CancelOrder.Result>
export async function privateRESTRequest(params: { url: 'ClosedOrders', data: ClosedOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<ClosedOrders.Result>
export async function privateRESTRequest(params: { url: 'DepositAddresses', data: DepositAddresses.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<DepositAddresses.Result>
export async function privateRESTRequest(params: { url: 'DepositMethods', data: DepositMethods.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<DepositMethods.Result>
export async function privateRESTRequest(params: { url: 'DepositStatus', data: DepositStatus.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<DepositStatus.Result>
export async function privateRESTRequest(params: { url: 'ExportStatus', data: ExportStatus.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<ExportStatus.Result>
export async function privateRESTRequest(params: { url: 'GetWebSocketsToken' }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<GetWebSocketsToken.Result>
export async function privateRESTRequest(params: { url: 'Ledgers', data?: Ledgers.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<Ledgers.Result>
export async function privateRESTRequest(params: { url: 'OpenOrders', data?: OpenOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<OpenOrders.Result>
export async function privateRESTRequest(params: { url: 'OpenPositions', data?: OpenPositions.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<OpenPositions.Result>
export async function privateRESTRequest(params: { url: 'QueryLedgers', data?: QueryLedgers.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<QueryLedgers.Result>
export async function privateRESTRequest(params: { url: 'QueryOrders', data?: QueryOrders.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<QueryOrders.Result>
export async function privateRESTRequest(params: { url: 'QueryTrades', data?: QueryTrades.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<QueryTrades.Result>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: RemoveExport.DeleteParams }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RemoveExport.DeleteResult>
export async function privateRESTRequest(params: { url: 'RemoveExport', data: RemoveExport.CancelParams }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RemoveExport.CancelResult>
export async function privateRESTRequest(params: { url: 'RetrieveExport', data: RetrieveExport.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<RetrieveExport.Result>
export async function privateRESTRequest(params: { url: 'TradeBalance', data: TradeBalance.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<TradeBalance.Result>
export async function privateRESTRequest(params: { url: 'TradesHistory', data: TradesHistory.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<TradesHistory.Result>
export async function privateRESTRequest(params: { url: 'TradeVolume', data: TradeVolume.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<TradeVolume.Result>
export async function privateRESTRequest(params: { url: 'WalletTransfer', data: WalletTransfer.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<WalletTransfer.Result>
export async function privateRESTRequest(params: { url: 'Withdraw', data: Withdraw.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<Withdraw.Result>
export async function privateRESTRequest(params: { url: 'WithdrawCancel', data: WithdrawCancel.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<WithdrawCancel.Result>
export async function privateRESTRequest(params: { url: 'WithdrawInfo', data: WithdrawInfo.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<WithdrawInfo.Result>
export async function privateRESTRequest(params: { url: 'WithdrawStatus', data: WithdrawStatus.Params }, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<WithdrawStatus.Result>

/**
 * Request against PRIVATE-REST API
 *
 * @param params - { url: PrivateREST.Endpoint; data: PrivateREST.Request; }
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns Promise<PrivateREST.Result>
 */
export async function privateRESTRequest(params: PrivateREST.Request, injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<PrivateREST.Result> {
    const apiClient = injectedApiKeys ? createPrivateRESTClient(injectedApiKeys.apiKey, injectedApiKeys.apiSecret) : defaultClient
    const { data: { result, error: privateRESTerror }} = await apiClient.request<PrivateREST.Response>(params) || {}
    if (privateRESTerror?.length) {
        throw new Error(privateRESTerror.join(' '))
    }
    
    return result
}
