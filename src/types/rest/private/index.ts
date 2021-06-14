import { OpenOrders } from './endpoints/OpenOrders'
import { ClosedOrders } from './endpoints/ClosedOrders'
import { GetWebSocketsToken } from './endpoints/GetWebSocketsToken'
import { Balance } from './endpoints/Balance'
import { RetrieveExport } from './endpoints/RetrieveExport'
import { RemoveExport } from './endpoints/RemoveExport'
import { AddExport } from './endpoints/AddExport'
import { AddOrder } from './endpoints/AddOrder'
import { CancelAll } from './endpoints/CancelAll'
import { CancelAllOrdersAfter } from './endpoints/CancelAllOrdersAfter'
import { CancelOrder } from './endpoints/CancelOrder'
import { DepositAddresses } from './endpoints/DepositAddresses'
import { DepositMethods } from './endpoints/DepositMethods'
import { DepositStatus } from './endpoints/DepositStatus'
import { ExportStatus } from './endpoints/ExportStatus'
import { Ledgers } from './endpoints/QueryLedgers'
import { OpenPositions } from './endpoints/OpenPositions'
import { QueryLedgers } from './endpoints/Ledgers'
import { QueryOrders } from './endpoints/QueryOrders'
import { QueryTrades } from './endpoints/QueryTrades'
import { TradeBalance } from './endpoints/TradeBalance'
import { TradesHistory } from './endpoints/TradesHistory'
import { TradeVolume } from './endpoints/TradeVolume'
import { WalletTransfer } from './endpoints/WalletTransfer'
import { Withdraw } from './endpoints/Withdraw'
import { WithdrawCancel } from './endpoints/WithdrawCancel'
import { WithdrawInfo } from './endpoints/WithdrawInfo'
import { WithdrawStatus } from './endpoints/WithdrawStatus'

export {
    AddExport, AddOrder, Balance,
    CancelAll, CancelAllOrdersAfter, CancelOrder, ClosedOrders,
    ExportStatus, GetWebSocketsToken, Ledgers,
    OpenOrders, OpenPositions,
    QueryLedgers, QueryOrders, QueryTrades,
    RemoveExport, RetrieveExport,
    TradeBalance, TradesHistory, TradeVolume,
    WalletTransfer, Withdraw, WithdrawCancel, WithdrawInfo, WithdrawStatus
}

export namespace PrivateREST {    
    export type Endpoint =
        'AddExport' | 'AddOrder' | 'Balance' |
        'CancelAll' | 'CancelAllOrdersAfter' | 'CancelOrder' | 'ClosedOrders' |
        'DepositAddresses' | 'DepositMethods' | 'DepositStatus' |
        'ExportStatus' | 'GetWebSocketsToken' | 'Ledgers' | 
        'OpenOrders' | 'OpenPositions' |
        'QueryLedgers' | 'QueryOrders' | 'QueryTrades' |
        'RemoveExport' | 'RetrieveExport' |
        'TradeBalance' | 'TradesHistory' | 'TradeVolume' |
        'WalletTransfer' | 'Withdraw' | 'WithdrawCancel' | 'WithdrawInfo' | 'WithdrawStatus';

    export type RuntimeApiKeys = {
        apiKey: string;
        apiSecret: string;
    }

    export type Params = AddExport.Params | AddOrder.Params | 
        CancelAllOrdersAfter.Params | CancelOrder.Params | ClosedOrders.Params |
        DepositAddresses.Params | DepositMethods.Params | DepositStatus.Params |
        ExportStatus.Params | Ledgers.Params |
        OpenOrders.Params | OpenPositions.Params |
        QueryLedgers.Params | QueryOrders.Params | QueryTrades.Params |
        RemoveExport.Params | RetrieveExport.Params |
        TradeBalance.Params | TradesHistory.Params | TradeVolume.Params |
        WalletTransfer.Params | Withdraw.Params | WithdrawCancel.Params | WithdrawInfo.Params | WithdrawStatus.Params;

    export type Response = AddExport.Response | AddOrder.Response | Balance.Response |
        CancelAll.Response | CancelAllOrdersAfter.Response | CancelOrder.Response | ClosedOrders.Response |
        DepositAddresses.Response | DepositMethods.Response | DepositStatus.Response |
        ExportStatus.Response | GetWebSocketsToken.Response | Ledgers.Response |
        OpenOrders.Response | OpenPositions.Response |
        QueryLedgers.Response | QueryOrders.Response | QueryTrades.Response |
        RemoveExport.Response | RetrieveExport.Response |
        TradeBalance.Response | TradesHistory.Response | TradeVolume.Response |
        WalletTransfer.Response | Withdraw.Response | WithdrawCancel.Response | WithdrawInfo.Response | WithdrawStatus.Response;
        
    export type Result = AddExport.Result | AddOrder.Result | Balance.Result |
        CancelAll.Result | CancelAllOrdersAfter.Result | CancelOrder.Result | ClosedOrders.Result |
        DepositAddresses.Result | DepositMethods.Result | DepositStatus.Result |
        ExportStatus.Result | GetWebSocketsToken.Result | Ledgers.Result |
        OpenOrders.Result | OpenPositions.Result |
        QueryLedgers.Result | QueryOrders.Result | QueryTrades.Result |
        RemoveExport.Result | RetrieveExport.Result |
        TradeBalance.Result | TradesHistory.Result | TradeVolume.Result |
        WalletTransfer.Result | Withdraw.Result | WithdrawCancel.Result | WithdrawInfo.Result | WithdrawStatus.Result;
        

    export interface Request {
        url: Endpoint;
        method?: 'POST' | 'post';
        data?: Params;
    }
}
