/* https://docs.kraken.com/api/docs/websocket-v2/ticker */

import { BaseSubscription, BaseUnsubscription } from '../../';

export namespace Ticker {
    export type Subscription = BaseSubscription<{
        channel: 'ticker';
        snapshot?: boolean;
        symbol: string[];
        event_trigger?: 'bbo' | 'trades';
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: 'ticker';
        symbol: string[];
    }>;

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
