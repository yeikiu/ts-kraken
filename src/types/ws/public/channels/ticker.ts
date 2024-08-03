import { BaseSubscription, BaseUnsubscription } from '../../';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/ticker | Ticker (Level 1)}
 * 
 * @example
 * ```ts 
    import { publicWsSubscription } from 'ts-kraken';

    publicWsSubscription({ channel: 'ticker', params: { symbol: ['BTC/USD'] } })
        .subscribe(({ data: [{ symbol, last }] }) => {
            console.log({ symbol, last });
        });
 * ```
 */
export namespace Ticker {

    /** {@inheritDoc Ticker} */
    export type Subscription = BaseSubscription<{
        channel: 'ticker';
        snapshot?: boolean;
        symbol: string[];
        event_trigger?: 'bbo' | 'trades';
    }>;

    /** {@inheritDoc Ticker} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'ticker';
        symbol: string[];
    }>;

    /** {@inheritDoc Ticker} */
    export type Update = {
        channel: 'ticker';
        type: 'snapshot' | 'update';
        data: [{
            symbol: string;
            ask: number;
            ask_qty: number;
            bid: number;
            bid_qty: number;
            change: number;
            change_pct: number;
            high: number;
            last: number;
            low: number;
            volume: number;
            vwap: number;
        }];
    };
}
