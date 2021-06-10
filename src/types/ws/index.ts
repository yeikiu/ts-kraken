import { OpenOrders } from './private/channels/openOrders'
import { OwnTrades } from './private/channels/ownTrades'
import { Book } from './public/channels/book'
import { OHLC } from './public/channels/ohlc'
import { Ticker } from './public/channels/ticker'

/* PUBLIC */
export { Ticker, OHLC, Book }
export namespace PublicWS {
    export type Channel =
        'ticker' | 'ohlc' | 'trade' | 'spread' | 'book'

    export type BaseSubscription = {
        channelName: Channel;
        pair: string[];
    }

    export type Subscription = BaseSubscription & Partial<OHLC.Subscription & Book.Subscription>
}

/* PRIVATE */
export { OwnTrades, OpenOrders }
export namespace PrivateWS {
    export type Channel =
        'ownTrades' | 'openOrders' | 'addOrder' |
        'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter'

    export type BaseSubscription = {
        channelName: Channel;
    }
    
    export type Subscription = BaseSubscription & Partial<OwnTrades.Subscription & OpenOrders.Subscription>
}
