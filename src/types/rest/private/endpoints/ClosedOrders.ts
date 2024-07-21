export type RestClosedOrder = {
    refid: string;	// Referral order transaction id that created this order
    userref: number; // user reference ID
    cl_ord_id: string;
    status: 'pending' | 'open' | 'closed' | 'expired' | 'canceled'; // status of order
    opentm: number; // unix timestamp of when order was placed
    closetm: number; // unix timestamp of when order was placed
    starttm: number; // unix timestamp of order start time (if set)
    expiretm: number; //unix timestamp of order end time (if set)
    descr: { // order description info
        pair: string; // asset pair (rest USDTUSD - ws USDT/USD)
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
    margin: boolean;
    misc: string; // comma delimited list of miscellaneous info: stopped=triggered by stop price, touched=triggered by touch price, liquidation=liquidation, partial=partial fill
    sender_sub_id: string;
    oflags: string; // Optional - comma delimited list of order flags. viqc = volume in quote currency (not currently available), fcib = prefer fee in base currency, fciq = prefer fee in quote currency, nompp = no market price protection, post = post only order (available when ordertype = limit)
    trades: string[];
    reason: string;
};

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | Get Closed Orders}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'ClosedOrders'
    }).then(({ closed: closedOrders }) => {
        console.log({ closedOrders })
    });
 * ```
 *
 * @remarks
 * ℹ️ _Tip:_ This library implements the helper method {@link PrivateRest.getClosedOrders} which outputs a nicer array of closed orders
 */
export type Endpoint = 'ClosedOrders';

/** {@inheritDoc Endpoint} */
export type Params = {
    trades?: boolean;
    userref?: number;
    start?: number | string;
    end?: number | string;
    ofs?: number;
    closetime?: 'open' | 'close' | 'both';
    consolidate_taker?: boolean;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    closed: Record<string, RestClosedOrder>;
}
