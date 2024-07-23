import { BaseSubscription, BaseUnsubscription } from '../../';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/book | Book (Level 2)}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicWs.getPublicSubscription({ channel: 'book', params: {
        symbol: ['BTC/USD'] ,
        depth: 10,

    } }).subscribe(({ data: [{ symbol, bids, asks }] }) => {
        console.log({ symbol, bid: bids[0]?.price, asks: asks[0]?.price });
    });
 * ```
 */
export namespace Book {
    
    /** {@inheritDoc Book} */
    export type Subscription = BaseSubscription<{
        channel: 'book';
        snapshot?: boolean;
        symbol: string[];
        depth?: 10 | 25 | 100 | 500 | 1000;
    }>;

    /** {@inheritDoc Book} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'book';
        symbol: string[];
        depth?: 10 | 25 | 100 | 500 | 1000;
    }>;

    /** {@inheritDoc Book} */
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
