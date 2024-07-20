/* https://docs.kraken.com/api/docs/websocket-v2/book */

import { BaseSubscription, BaseUnsubscription } from '../../';

export namespace Book {
    export type Subscription = BaseSubscription<{
        channel: 'book';
        snapshot?: boolean;
        symbol: string[];
        depth?: 10 | 25 | 100 | 500 | 1000;
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: 'book';
        symbol: string[];
        depth?: 10 | 25 | 100 | 500 | 1000;
    }>;

    export type Update = {
        channel: 'book';
        type: 'snapshot' | 'update';
        data: [{
            symbol: string;
            bids: {
                price: number;
                qty: number;
            }[];
            asks: {
                price: number;
                qty: number;
            }[];
            checksum: number;
            timestamp: string; // TODO: report missing in docs
        }];
    };
}
