export type IRestOrderSnapshot = RestOrdersSnapshot & { orderid: string; };

export type RestOrdersSnapshot = {
    refid: string;	// Referral order transaction id that created this order
    userref: number; // user reference ID
    status: 'pending' | 'open' | 'closed' | 'expired' | 'canceled'; // status of order
    opentm: number; // unix timestamp of when order was placed
    closetm: number; // unix timestamp of order close time
    starttm: number; // unix timestamp of order start time (if set)
    expiretm: number; //unix timestamp of order end time (if set)
    descr: { // order description info
        pair: string; // asset pair (rest USDTUSD - ws USDT/USD)
        position: string; // Optional - position ID (if applicable)
        type: 'buy' | 'sell';
        ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
        price: string; // primary price
        price2: string; // secondary price
        leverage: string; // amount of leverage
        order: string; // order description
        close: string; // conditional close order description (if conditional close set)
    };
    vol: string; // volume of order (base currency unless viqc set in oflags)
    vol_exec: string; // total volume executed so far (base currency unless viqc set in oflags)
    cost: string; // total cost (quote currency unless unless viqc set in oflags)
    fee: string; // total fee (quote currency)
    price: string; // REST API ONLY - average price (cumulative; quote currency unless viqc set in oflags) - Injected to WS payload
    stopprice: string; // stop price (quote currency, for trailing stops)
    limitprice: string; // triggered limit price (quote currency, when limit based order type triggered)
    trigger: 'last' | 'index'; // Price signal used to trigger stop-loss, stop-loss-limit, take-profit and take-profit-limit orders.
    misc: string; // comma delimited list of miscellaneous info: stopped=triggered by stop price, touched=triggered by touch price, liquidation=liquidation, partial=partial fill
    oflags: string; // Optional - comma delimited list of order flags. viqc = volume in quote currency (not currently available), fcib = prefer fee in base currency, fciq = prefer fee in quote currency, nompp = no market price protection, post = post only order (available when ordertype = limit)
    reason?: string; // REST API ONLY - Optional - cancel reason
};

export * as AddExport from './AddExport';
export * as AddOrder from './AddOrder';
export * as EditOrder from './EditOrder';
export * as Balance from './Balance';
export * as CancelAll from './CancelAll';
export * as CancelAllOrdersAfter from './CancelAllOrdersAfter';
export * as CancelOrder from './CancelOrder';
export * as ClosedOrders from './ClosedOrders';
export * as DepositAddresses from './DepositAddresses';
export * as DepositMethods from './DepositMethods';
export * as DepositStatus from './DepositStatus';
export * as ExportStatus from './ExportStatus';
export * as GetWebSocketsToken from './GetWebSocketsToken';
export * as Ledgers from './Ledgers';
export * as OpenOrders from './OpenOrders';
export * as OpenPositions from './OpenPositions';
export * as QueryLedgers from './QueryLedgers';
export * as QueryOrders from './QueryOrders';
export * as QueryTrades from './QueryTrades';
export * as RemoveExport from './RemoveExport';
export * as RetrieveExport from './RetrieveExport';
export * as TradeBalance from './TradeBalance';
export * as TradeVolume from './TradeVolume';
export * as TradesHistory from './TradesHistory';
export * as WalletTransfer from './WalletTransfer';
export * as Withdraw from './Withdraw';
export * as WithdrawCancel from './WithdrawCancel';
export * as WithdrawInfo from './WithdrawInfo';
export * as WithdrawStatus from './WithdrawStatus';
