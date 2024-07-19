import { RESTResponse } from '../responses_rest';
import { AddExport, AddOrder, Balance, CancelAll, CancelAllOrdersAfter, CancelOrder, ClosedOrders, DepositAddresses, DepositMethods, DepositStatus, EditOrder, ExportStatus, GetWebSocketsToken, Ledgers, OpenOrders, OpenPositions, QueryLedgers, QueryOrders, QueryTrades, RemoveExport, RetrieveExport, TradeBalance, TradesHistory, TradeVolume, WalletTransfer, Withdraw, WithdrawCancel, WithdrawInfo, WithdrawStatus } from './endpoints';

export type Endpoint =
    AddExport.Endpoint |
    AddOrder.Endpoint |
    Balance.Endpoint |
    CancelAll.Endpoint |
    CancelAllOrdersAfter.Endpoint |
    CancelOrder.Endpoint |
    ClosedOrders.Endpoint |
    DepositAddresses.Endpoint |
    DepositMethods.Endpoint |
    DepositStatus.Endpoint |
    EditOrder.Endpoint |
    ExportStatus.Endpoint |
    GetWebSocketsToken.Endpoint |
    Ledgers.Endpoint |
    OpenOrders.Endpoint |
    OpenPositions.Endpoint |
    QueryLedgers.Endpoint |
    QueryOrders.Endpoint |
    QueryTrades.Endpoint |
    RemoveExport.Endpoint |
    RetrieveExport.Endpoint |
    TradeBalance.Endpoint |
    TradesHistory.Endpoint |
    TradeVolume.Endpoint |
    WalletTransfer.Endpoint |
    Withdraw.Endpoint |
    WithdrawCancel.Endpoint |
    WithdrawInfo.Endpoint |
    WithdrawStatus.Endpoint;

export type Params<T extends Endpoint> =
    T extends AddExport.Endpoint ? AddExport.Params :
    T extends AddOrder.Endpoint ? AddOrder.Params : 
    T extends CancelAllOrdersAfter.Endpoint ? CancelAllOrdersAfter.Params :
    T extends CancelOrder.Endpoint ? CancelOrder.Params :
    T extends ClosedOrders.Endpoint ? ClosedOrders.Params :
    T extends DepositAddresses.Endpoint ? DepositAddresses.Params :
    T extends DepositMethods.Endpoint ? DepositMethods.Params :
    T extends DepositStatus.Endpoint ? DepositStatus.Params :
    T extends EditOrder.Endpoint ? EditOrder.Params :
    T extends ExportStatus.Endpoint ? ExportStatus.Params :
    T extends Ledgers.Endpoint ? Ledgers.Params :
    T extends OpenOrders.Endpoint ? OpenOrders.Params :
    T extends OpenPositions.Endpoint ? OpenPositions.Params :
    T extends QueryLedgers.Endpoint ? QueryLedgers.Params :
    T extends QueryOrders.Endpoint ? QueryOrders.Params :
    T extends QueryTrades.Endpoint ? QueryTrades.Params :
    T extends RemoveExport.Endpoint ? RemoveExport.Params :
    T extends RetrieveExport.Endpoint ? RetrieveExport.Params :
    T extends TradeBalance.Endpoint ? TradeBalance.Params :
    T extends TradesHistory.Endpoint ? TradesHistory.Params :
    T extends TradeVolume.Endpoint ? TradeVolume.Params :
    T extends WalletTransfer.Endpoint ? WalletTransfer.Params :
    T extends Withdraw.Endpoint ? Withdraw.Params :
    T extends WithdrawCancel.Endpoint ? WithdrawCancel.Params :
    T extends WithdrawInfo.Endpoint ? WithdrawInfo.Params :
    T extends WithdrawStatus.Endpoint ? WithdrawStatus.Params : never;


export type Request<T extends Endpoint> = {
    url: T;
    method?: 'POST' | 'post';
    data?: Params<T>;
}
    
export type Result<T extends Endpoint> =
    T extends AddExport.Endpoint ? AddExport.Result :
    T extends AddOrder.Endpoint ? AddOrder.Result :
    T extends Balance.Endpoint ? Balance.Result :
    T extends CancelAll.Endpoint ? CancelAll.Result :
    T extends CancelAllOrdersAfter.Endpoint ? CancelAllOrdersAfter.Result :
    T extends CancelOrder.Endpoint ? CancelOrder.Result :
    T extends ClosedOrders.Endpoint ? ClosedOrders.Result :
    T extends DepositAddresses.Endpoint ? DepositAddresses.Result :
    T extends DepositMethods.Endpoint ? DepositMethods.Result :
    T extends DepositStatus.Endpoint ? DepositStatus.Result :
    T extends EditOrder.Endpoint ? EditOrder.Result :
    T extends ExportStatus.Endpoint ? ExportStatus.Result :
    T extends GetWebSocketsToken.Endpoint ? GetWebSocketsToken.Result :
    T extends Ledgers.Endpoint ? Ledgers.Result : 
    T extends OpenOrders.Endpoint ? OpenOrders.Result :
    T extends OpenPositions.Endpoint ? OpenPositions.Result :
    T extends QueryLedgers.Endpoint ? QueryLedgers.Result :
    T extends QueryOrders.Endpoint ? QueryOrders.Result :
    T extends QueryTrades.Endpoint ? QueryTrades.Result :
    T extends RemoveExport.Endpoint ? RemoveExport.Result<RemoveExport.CancelParams | RemoveExport.DeleteParams> :
    T extends RetrieveExport.Endpoint ? RetrieveExport.Result :
    T extends TradeBalance.Endpoint ? TradeBalance.Result :
    T extends TradesHistory.Endpoint ? TradesHistory.Result :
    T extends TradeVolume.Endpoint ? TradeVolume.Result :
    T extends WalletTransfer.Endpoint ? WalletTransfer.Result :
    T extends Withdraw.Endpoint ? Withdraw.Result :
    T extends WithdrawCancel.Endpoint ? WithdrawCancel.Result :
    T extends WithdrawInfo.Endpoint ? WithdrawInfo.Result :
    T extends WithdrawStatus.Endpoint ? WithdrawStatus.Result : never;

export type Response<T extends Endpoint> = RESTResponse<Result<T>>;
