/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trades-info | Query Trades Info}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'QueryTrades',
        data: { trades: true, txid: 'YOUR-ORDER-IDTX' }
    }).then((tradesInfo) => {
        console.log({ tradesInfo });
    });
 * ```
 */
export type Endpoint = 'QueryTrades';

/** {@inheritDoc Endpoint} */
export type Params = {
    txid: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
    trades?: boolean;
}

/** {@inheritDoc Endpoint} */
export type Result = Record<string, {
    ordertxid: string;
    postxid: string;
    pair: string;
    time: number;
    type: 'buy' | 'sell';
    ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
    price: string; // primary price
    cost: string; // total cost (quote currency unless unless viqc set in oflags)
    fee: string; // total fee (quote currency)
    vol: string; // volume of order (base currency unless viqc set in oflags)      
    margin: string;
    leverage: string;
    misc: string;
    ledgers: string[];
    trade_id: number;
    maker: boolean;
    posstatus: 'open' | 'closed';
    cprice: string;
    ccost: string;
    cfee: string; // total fee (quote currency)
    cvol: string; // volume of order (base currency unless viqc set in oflags)      
    cmargin: string;
    net: string;
    trades: string[];
}>;
