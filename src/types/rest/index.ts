import { AxiosRequestConfig } from 'axios'
import { Assets, SystemStatus, Ticker, Time } from './public'

export type TResponse<T> = {
    error: string[];
    result: T
}

export { Assets, SystemStatus, Ticker, Time }
export namespace PublicREST {
    export type Endpoint =
        'Time' | 'SystemStatus' | 'Assets' | 'AssetPairs' | 'Ticker' |
        'Depth' | 'Trades' | 'Spread' | 'OHLC'

    export type Params = Time.Params | SystemStatus.Params | Ticker.Params | Assets.Params
    export type Response = Time.Response | SystemStatus.Response | Ticker.Response | Assets.Response
    export type Result = Time.Result | SystemStatus.Result | Ticker.Result | Assets.Result

    export interface AxiosRequest extends AxiosRequestConfig {
        url: Endpoint;
        method?: 'GET' | 'get';
        params?: Params;
    }
}

export namespace PrivateREST {
    export type Endpoint =
        'Balance' | 'TradeBalance' | 'OpenOrders' | 'ClosedOrders' |
        'QueryOrders' | 'TradesHistory' | 'QueryTrades' | 'OpenPositions' |
        'Ledgers' | 'QueryLedgers' | 'TradeVolume' | 'AddOrder' |
        'CancelOrder' | 'DepositMethods' | 'DepositAddresses' | 'DepositStatus' |
        'WithdrawInfo' | 'Withdraw' | 'WithdrawStatus' | 'WithdrawCancel' |
        'GetWebSocketsToken' | 'AddExport' | 'ExportStatus' | 'RetrieveExport' |
        'RemoveExport' | 'CancelAll' | 'CancelAllOrdersAfter'

    export type Params = {}
    export type Response = {}
    export type Result = {}

    export interface AxiosRequest extends AxiosRequestConfig {
        url: Endpoint;
        method?: 'POST' | 'post';
        data?: any;
    }
}
