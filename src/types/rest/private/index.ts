import { RestResponse } from '..';
import { AddExport, AddOrder, AddOrderBatch, Balance, BalanceEx, CancelAll, CancelAllOrdersAfter, CancelOrder, CancelOrderBatch, ClosedOrders, EditOrder, ExportStatus, GetWebSocketsToken, Ledgers, OpenOrders, OpenPositions, QueryLedgers, QueryOrders, QueryTrades, RemoveExport, RetrieveExport, TradeBalance, TradeVolume, TradesHistory } from './endpoints';

export * as PrivateEndpoints from './endpoints';

export type ApiToken = string;
export type ApiCredentials = {
    apiKey: string;
    apiSecret: string;
};

export type PrivateRestEndpoint =
    'AddExport' |
    'AddOrder' |
    'AddOrderBatch' |
    'Balance' | // no params
    'BalanceEx' | // no params
    'CancelAll' | // no params
    'CancelAllOrdersAfter' |
    'CancelOrder' |
    'CancelOrderBatch' |
    'ClosedOrders' |
    'EditOrder' |
    'ExportStatus' |
    'GetWebSocketsToken' | // no params
    'Ledgers' |
    'OpenOrders' |
    'OpenPositions' |
    'QueryLedgers' |
    'QueryOrders' |
    'QueryTrades' |
    'RemoveExport' |
    'RetrieveExport' |
    'TradeBalance' |
    'TradesHistory' |
    'TradeVolume';

/**
 * @ignore
 */    
export type PrivateRestParams<T extends PrivateRestEndpoint> =
    T extends 'AddExport' ? AddExport.Params :
    T extends 'AddOrder' ? AddOrder.Params :
    T extends 'AddOrderBatch' ? AddOrderBatch.Params :
    T extends 'CancelAllOrdersAfter' ? CancelAllOrdersAfter.Params :
    T extends 'CancelOrder' ? CancelOrder.Params :
    T extends 'CancelOrderBatch' ? CancelOrderBatch.Params :
    T extends 'ClosedOrders' ? ClosedOrders.Params : // all optional
    T extends 'EditOrder' ? EditOrder.Params :
    T extends 'ExportStatus' ? ExportStatus.Params :
    T extends 'Ledgers' ? Ledgers.Params : // all optional
    T extends 'OpenOrders' ? OpenOrders.Params : // all optional
    T extends 'OpenPositions' ? OpenPositions.Params : // all optional
    T extends 'QueryLedgers' ? QueryLedgers.Params :
    T extends 'QueryOrders' ? QueryOrders.Params :
    T extends 'QueryTrades' ? QueryTrades.Params :
    T extends 'RemoveExport' ? RemoveExport.Params :
    T extends 'RetrieveExport' ? RetrieveExport.Params :
    T extends 'TradeBalance' ? TradeBalance.Params : // all optional
    T extends 'TradesHistory' ? TradesHistory.Params : // all optional
    T extends 'TradeVolume' ? TradeVolume.Params : // all optional
    never;

/**
 * @ignore
 */ 
export type PrivateRestRequest<T extends PrivateRestEndpoint> =
    T extends 'Balance' ? { // no params
        url: T;
        data?: never;
    } :
    T extends 'BalanceEx' ? { // no params
        url: T;
        data?: never;
    } :
    T extends 'CancelAll' ? { // no params
        url: T;
        data?: never;
    } :
    T extends 'GetWebSocketsToken' ? { // no params
        url: T;
        data?: never;
    } :
    T extends 'ClosedOrders' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'Ledgers' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'OpenOrders' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'OpenPositions' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'TradeBalance' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'TradesHistory' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } :
    T extends 'TradeVolume' ? { // all optional
        url: T;
        data?: PrivateRestParams<T>;
    } : { // Mandatory params
        url: T;
        data: PrivateRestParams<T>;
    };

/**
 * @ignore
 */ 
export type PrivateRestResult<T extends PrivateRestEndpoint> =
    T extends 'AddExport' ? AddExport.Result :
    T extends 'AddOrder' ? AddOrder.Result :
    T extends 'AddOrderBatch' ? AddOrderBatch.Result :
    T extends 'Balance' ? Balance.Result :
    T extends 'BalanceEx' ? BalanceEx.Result :
    T extends 'CancelAll' ? CancelAll.Result :
    T extends 'CancelAllOrdersAfter' ? CancelAllOrdersAfter.Result :
    T extends 'CancelOrder' ? CancelOrder.Result :
    T extends 'CancelOrderBatch' ? CancelOrderBatch.Result :
    T extends 'ClosedOrders' ? ClosedOrders.Result :
    T extends 'EditOrder' ? EditOrder.Result :
    T extends 'ExportStatus' ? ExportStatus.Result :
    T extends 'GetWebSocketsToken' ? GetWebSocketsToken.Result :
    T extends 'Ledgers' ? Ledgers.Result :
    T extends 'OpenOrders' ? OpenOrders.Result :
    T extends 'OpenPositions' ? OpenPositions.Result :
    T extends 'QueryLedgers' ? QueryLedgers.Result :
    T extends 'QueryOrders' ? QueryOrders.Result :
    T extends 'QueryTrades' ? QueryTrades.Result :
    T extends 'RemoveExport' ? RemoveExport.Result :
    T extends 'RetrieveExport' ? RetrieveExport.Result :
    T extends 'TradeBalance' ? TradeBalance.Result :
    T extends 'TradesHistory' ? TradesHistory.Result :
    T extends 'TradeVolume' ? TradeVolume.Result : never;

/**
 * @ignore
 */ 
export type PrivateRestResponse<T extends PrivateRestEndpoint> = RestResponse<PrivateRestResult<T>>;
