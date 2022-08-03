import type { AddExport, AddOrder, CancelOrder, ClosedOrders, CancelAllOrdersAfter, DepositAddresses, DepositMethods, DepositStatus, ExportStatus, Ledgers, OpenOrders, OpenPositions, QueryLedgers, QueryOrders, QueryTrades, RemoveExport, RetrieveExport, TradeBalance, TradesHistory, TradeVolume, WalletTransfer, Withdraw, WithdrawCancel, WithdrawInfo, WithdrawStatus, Balance, CancelAll, GetWebSocketsToken, EditOrder } from './endpoints'

export * as Endpoints from './endpoints'
export * as Helpers from './helpers'

export type Endpoint =
    'AddExport' | 'AddOrder' | 'Balance' |
    'CancelAll' | 'CancelAllOrdersAfter' | 'CancelOrder' | 'ClosedOrders' |
    'DepositAddresses' | 'DepositMethods' | 'DepositStatus' |
    'EditOrder' | 'ExportStatus' | 'GetWebSocketsToken' | 'Ledgers' | 
    'OpenOrders' | 'OpenPositions' |
    'QueryLedgers' | 'QueryOrders' | 'QueryTrades' |
    'RemoveExport' | 'RetrieveExport' |
    'TradeBalance' | 'TradesHistory' | 'TradeVolume' |
    'WalletTransfer' | 'Withdraw' | 'WithdrawCancel' | 'WithdrawInfo' | 'WithdrawStatus';

export type Params = AddExport.Params | AddOrder.Params | 
    CancelAllOrdersAfter.Params | CancelOrder.Params | ClosedOrders.Params |
    DepositAddresses.Params | DepositMethods.Params | DepositStatus.Params |
    EditOrder.Params | ExportStatus.Params | Ledgers.Params |
    OpenOrders.Params | OpenPositions.Params |
    QueryLedgers.Params | QueryOrders.Params | QueryTrades.Params |
    RemoveExport.Params | RetrieveExport.Params |
    TradeBalance.Params | TradesHistory.Params | TradeVolume.Params |
    WalletTransfer.Params | Withdraw.Params | WithdrawCancel.Params | WithdrawInfo.Params | WithdrawStatus.Params;

export type Response = AddExport.Response | AddOrder.Response | Balance.Response |
    CancelAll.Response | CancelAllOrdersAfter.Response | CancelOrder.Response | ClosedOrders.Response |
    DepositAddresses.Response | DepositMethods.Response | DepositStatus.Response |
    EditOrder.Response | ExportStatus.Response | GetWebSocketsToken.Response | Ledgers.Response |
    OpenOrders.Response | OpenPositions.Response |
    QueryLedgers.Response | QueryOrders.Response | QueryTrades.Response |
    RemoveExport.Response | RetrieveExport.Response |
    TradeBalance.Response | TradesHistory.Response | TradeVolume.Response |
    WalletTransfer.Response | Withdraw.Response | WithdrawCancel.Response | WithdrawInfo.Response | WithdrawStatus.Response;
    
export type Result = AddExport.Result | AddOrder.Result | Balance.Result |
    CancelAll.Result | CancelAllOrdersAfter.Result | CancelOrder.Result | ClosedOrders.Result |
    DepositAddresses.Result | DepositMethods.Result | DepositStatus.Result |
    EditOrder.Result | ExportStatus.Result | GetWebSocketsToken.Result | Ledgers.Result |
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
