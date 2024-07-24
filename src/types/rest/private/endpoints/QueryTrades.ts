/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trades-info | Query Trades Info}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'QueryTrades',
        data: { trades: true, txid: 'YOUR-TRADE-ID1,YOUR-TRADE-ID2' }
    }).then((tradesInfo) => {
        console.log({ tradesInfo });
    });
 * ```
 *
 * @remarks
 * The `txid` field doesn't accept whitespaces in the comma-separated list of trades IDs.
 */
export namespace QueryTrades {

    /**
     * @ignore
     */
    export type Endpoint = 'QueryTrades';

    /** {@inheritDoc QueryTrades} */
    export type Params = {
        txid: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
        trades?: boolean;
    }

    /** {@inheritDoc QueryTrades} */
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
}
