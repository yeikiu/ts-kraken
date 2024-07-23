import { RestResponse } from '..';
import { AddExport, AddOrder, AddOrderBatch, Balance, BalanceEx, CancelAll, CancelAllOrdersAfter, CancelOrder, CancelOrderBatch, ClosedOrders, EditOrder, ExportStatus, GetWebSocketsToken, Ledgers, OpenOrders, OpenPositions, QueryLedgers, QueryOrders, QueryTrades, RemoveExport, RetrieveExport, TradeBalance, TradeVolume, TradesHistory } from './endpoints';

export * as PrivateEndpoints from './endpoints';

export type PrivateEndpoint =
    AddExport.Endpoint |
    AddOrder.Endpoint |
    AddOrderBatch.Endpoint |
    Balance.Endpoint | // no params
    BalanceEx.Endpoint | // no params
    CancelAll.Endpoint | // no params
    CancelAllOrdersAfter.Endpoint |
    CancelOrder.Endpoint |
    CancelOrderBatch.Endpoint |
    ClosedOrders.Endpoint |
    EditOrder.Endpoint |
    ExportStatus.Endpoint |
    GetWebSocketsToken.Endpoint | // no params
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
    TradeVolume.Endpoint;

export type PrivateParams<T extends PrivateEndpoint> =
    T extends AddExport.Endpoint ? AddExport.Params :
    T extends AddOrder.Endpoint ? AddOrder.Params :
    T extends AddOrderBatch.Endpoint ? AddOrderBatch.Params :
    T extends CancelAllOrdersAfter.Endpoint ? CancelAllOrdersAfter.Params :
    T extends CancelOrder.Endpoint ? CancelOrder.Params :
    T extends CancelOrderBatch.Endpoint ? CancelOrderBatch.Params :
    T extends ClosedOrders.Endpoint ? ClosedOrders.Params : // all optional
    T extends EditOrder.Endpoint ? EditOrder.Params :
    T extends ExportStatus.Endpoint ? ExportStatus.Params :
    T extends Ledgers.Endpoint ? Ledgers.Params : // all optional
    T extends OpenOrders.Endpoint ? OpenOrders.Params : // all optional
    T extends OpenPositions.Endpoint ? OpenPositions.Params : // all optional
    T extends QueryLedgers.Endpoint ? QueryLedgers.Params :
    T extends QueryOrders.Endpoint ? QueryOrders.Params :
    T extends QueryTrades.Endpoint ? QueryTrades.Params :
    T extends RemoveExport.Endpoint ? RemoveExport.Params :
    T extends RetrieveExport.Endpoint ? RetrieveExport.Params :
    T extends TradeBalance.Endpoint ? TradeBalance.Params : // all optional
    T extends TradesHistory.Endpoint ? TradesHistory.Params : // all optional
    T extends TradeVolume.Endpoint ? TradeVolume.Params : // all optional
    never;

export type PrivateRequest<T extends PrivateEndpoint> =
    T extends Balance.Endpoint ? { // no params
        url: T;
        data?: never;
    } :
    T extends BalanceEx.Endpoint ? { // no params
        url: T;
        data?: never;
    } :
    T extends CancelAll.Endpoint ? { // no params
        url: T;
        data?: never;
    } :
    T extends GetWebSocketsToken.Endpoint ? { // no params
        url: T;
        data?: never;
    } :
    T extends ClosedOrders.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } :
    T extends Ledgers.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } : 
    T extends OpenOrders.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } : 
    T extends OpenPositions.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } : 
    T extends TradeBalance.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } : 
    T extends TradesHistory.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } : 
    T extends TradeVolume.Endpoint ? { // all optional
        url: T;
        data?: PrivateParams<T>;
    } :  { // Mandatory params
        url: T;
        data: PrivateParams<T>;
    };

export type PrivateResult<T extends PrivateEndpoint> =
    T extends AddExport.Endpoint ? AddExport.Result :
    T extends AddOrder.Endpoint ? AddOrder.Result :
    T extends AddOrderBatch.Endpoint ? AddOrderBatch.Result :
    T extends Balance.Endpoint ? Balance.Result :
    T extends BalanceEx.Endpoint ? BalanceEx.Result :
    T extends CancelAll.Endpoint ? CancelAll.Result :
    T extends CancelAllOrdersAfter.Endpoint ? CancelAllOrdersAfter.Result :
    T extends CancelOrder.Endpoint ? CancelOrder.Result :
    T extends CancelOrderBatch.Endpoint ? CancelOrderBatch.Result :
    T extends ClosedOrders.Endpoint ? ClosedOrders.Result :
    T extends EditOrder.Endpoint ? EditOrder.Result :
    T extends ExportStatus.Endpoint ? ExportStatus.Result :
    T extends GetWebSocketsToken.Endpoint ? GetWebSocketsToken.Result :
    T extends Ledgers.Endpoint ? Ledgers.Result :
    T extends OpenOrders.Endpoint ? OpenOrders.Result :
    T extends OpenPositions.Endpoint ? OpenPositions.Result :
    T extends QueryLedgers.Endpoint ? QueryLedgers.Result :
    T extends QueryOrders.Endpoint ? QueryOrders.Result :
    T extends QueryTrades.Endpoint ? QueryTrades.Result :
    T extends RemoveExport.Endpoint ? RemoveExport.Result :
    T extends RetrieveExport.Endpoint ? RetrieveExport.Result :
    T extends TradeBalance.Endpoint ? TradeBalance.Result :
    T extends TradesHistory.Endpoint ? TradesHistory.Result :
    T extends TradeVolume.Endpoint ? TradeVolume.Result : never;

/**
 * Generic Private Rest response
 */
export type PrivateResponse<T extends PrivateEndpoint> = RestResponse<PrivateResult<T>>;
