import { BaseSubscription, BaseUnsubscription } from '../..';


/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/ohlc | Candles (OHLC)}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicWs.getPublicSubscription({ channel: 'ohlc', params: {
        symbol: ['BTC/USD'] ,
        interval: 1,

    } }).subscribe(({ data: [{ symbol, close }] }) => {
        console.log({ symbol, close });
    });
 * ```
 */
export namespace Ohlc {

    /** {@inheritDoc Ohlc} */
    export type Subscription = BaseSubscription<{
        channel: 'ohlc';
        snapshot?: boolean;
        symbol: string[];
        interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600;
    }>;

    /** {@inheritDoc Ohlc} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'ohlc';
        symbol: string[];
        interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600;
    }>

    /** {@inheritDoc Ohlc} */
    export type Update = {
        channel: 'ohlc';
        type: 'snapshot' | 'update';
        data: {
            symbol: string;
            open: number;
            high: number;
            low: number;
            close: number;
            vwap: number;
            trades: number;
            volume: number;
            interval_begin: string;
            interval: number;
        }[];
    }
}
