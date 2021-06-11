import { OpenOrders } from './endpoints/OpenOrders'
import { ClosedOrders } from './endpoints/ClosedOrders'
import { GetWebSocketsToken } from './endpoints/GetWebSocketsToken'

export { OpenOrders, ClosedOrders, GetWebSocketsToken }
export namespace PrivateREST {
    export type Endpoint =
        'Balance' | 'TradeBalance' | 'OpenOrders' | 'ClosedOrders' |
        'QueryOrders' | 'TradesHistory' | 'QueryTrades' | 'OpenPositions' |
        'Ledgers' | 'QueryLedgers' | 'TradeVolume' | 'AddOrder' |
        'CancelOrder' | 'DepositMethods' | 'DepositAddresses' | 'DepositStatus' |
        'WithdrawInfo' | 'Withdraw' | 'WithdrawStatus' | 'WithdrawCancel' |
        'GetWebSocketsToken' | 'AddExport' | 'ExportStatus' | 'RetrieveExport' |
        'RemoveExport' | 'CancelAll' | 'CancelAllOrdersAfter'

    export type RuntimeApiKeys = {
        apiKey: string;
        apiSecret: string;
    }

    export type Params = OpenOrders.Params | ClosedOrders.Params
    export type Response = OpenOrders.Response | ClosedOrders.Response | GetWebSocketsToken.Response
    export type Result = OpenOrders.Result | ClosedOrders.Result | GetWebSocketsToken.Result

    export interface Request {
        url: Endpoint;
        method?: 'POST' | 'post';
        data?: any;
    }
}
