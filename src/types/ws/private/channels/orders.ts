import { BaseSubscription, BaseUnsubscription } from '../..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/level3 | Orders (Level 3)}
 * 
 * @example
 * ```ts 
    import { getPrivateSubscription } from 'ts-kraken';

    getPrivateSubscription({ channel: 'level3', params: { symbol: ['BTC/USD'] } })
        .then(balance$ => {
            balance$.subscribe(({ type, data: [{ bids, asks }] }) => {
                console.log({ type, bids, asks });
            });
        });
 * ```
 */
export namespace Orders {
    
    /** {@inheritDoc Orders} */
    export type Subscription = BaseSubscription<{
        channel: 'level3';
        snapshot?: boolean;
        symbol: string[];
        depth?: 10 | 100 | 1000;
    }>;

    /** {@inheritDoc Orders} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'level3';
        symbol: string[];
        depth?: 10 | 100 | 1000;
    }>;

    /** {@inheritDoc Orders} */
    export type Update = {
        channel: 'level3';
        type: 'snapshot' | 'update';
        data: [{
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
        }];
    };
}
