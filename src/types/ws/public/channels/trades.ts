import { BaseSubscription, BaseUnsubscription } from '../..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/trade | Trades}
 * 
 * @example
 * ```ts 
    import { publicWsSubscription } from 'ts-kraken';

    publicWsSubscription({ channel: 'trade', params: { symbol: ['BTC/USD'] } })
        .subscribe(({ data: [{ side, symbol, price, timestamp }] }) => {
            console.log({ side, symbol, price, timestamp });
        });
 * ```
 */
export namespace Trades {
    
    /** {@inheritDoc PublicWsTypes.PublicChannels.Trade} */
    export type Subscription = BaseSubscription<{
        channel: 'trade';
        snapshot?: boolean;
        symbol: string[];
    }>;

    /** {@inheritDoc PublicWsTypes.PublicChannels.Trade} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'trade';
        symbol: string[];
    }>;

    /** {@inheritDoc PublicWsTypes.PublicChannels.Trade} */
    export type Update = {
        channel: 'trade';
        type: 'snapshot' | 'update';
        data: {
            symbol: string;
            side: 'sell' | 'buy';
            qty: number;
            price: number;
            ord_type: string;
            trade_id: number;
            timestamp: string;
        }[];
    };
}
