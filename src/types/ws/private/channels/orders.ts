/* https://docs.kraken.com/api/docs/websocket-v2/level3 */

import { BaseSubscription, BaseUnsubscription } from '../..';

export namespace Orders {
    export type Subscription = BaseSubscription<{
        channel: 'level3';
        snapshot?: boolean;
        symbol: string[];
        depth?: 10 | 100 | 1000;
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: 'level3';
        symbol: string[];
        depth?: 10 | 100 | 1000;
    }>;

    export type Update = {
        channel: 'level3';
        type: 'snapshot' | 'update';
        data: {
            checksum: number;
            symbol: string;
            bids: {
                event: 'add' | 'modify' | 'delete';
                order_id: string;
                limit_price: number;
                order_qty: number;
                timestamp: string;
            }[];
            asks: {
                event: 'add' | 'modify' | 'delete';
                order_id: string;
                limit_price: number;
                order_qty: number;
                timestamp: string;
            }[];
        };
    };
}
