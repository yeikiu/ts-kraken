import { OpenOrders } from './endpoints/OpenOrders'
import { ClosedOrders } from './endpoints/ClosedOrders'
import { GetWebSocketsToken } from './endpoints/GetWebSocketsToken'
import { Balance } from './endpoints/Balance'
import { RetrieveExport } from './endpoints/RetrieveExport'
import { RemoveExport } from './endpoints/RemoveExport'
import { AddExport } from './endpoints/AddExport'

export { AddExport, Balance, OpenOrders, ClosedOrders, GetWebSocketsToken }
export namespace PrivateREST {    
    export type Endpoint =
        'AddExport' | 'Balance' | 'TradeBalance' | 'OpenOrders' | 'ClosedOrders' |
        'QueryOrders' | 'TradesHistory' | 'QueryTrades' | 'OpenPositions' |
        'Ledgers' | 'QueryLedgers' | 'TradeVolume' | 'AddOrder' |
        'CancelOrder' | 'DepositMethods' | 'DepositAddresses' | 'DepositStatus' |
        'WithdrawInfo' | 'Withdraw' | 'WithdrawStatus' | 'WithdrawCancel' |
        'GetWebSocketsToken' | 'ExportStatus' | 'RetrieveExport' |
        'RemoveExport' | 'CancelAll' | 'CancelAllOrdersAfter'

    export type RuntimeApiKeys = {
        apiKey: string;
        apiSecret: string;
    }

    export type Params = AddExport.Params | RemoveExport.Params | RetrieveExport.Params | OpenOrders.Params | ClosedOrders.Params
    export type Response = AddExport.Response | RemoveExport.Response | RetrieveExport.Response | Balance.Response | OpenOrders.Response | ClosedOrders.Response | GetWebSocketsToken.Response
    export type Result = AddExport.Result | RemoveExport.Result | RetrieveExport.Result | Balance.Result | OpenOrders.Result | ClosedOrders.Result | GetWebSocketsToken.Result

    export interface Request {
        url: Endpoint;
        method?: 'POST' | 'post';
        data?: Params;
    }
}
