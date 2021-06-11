import { Ticker } from './channels/ticker'
import { OHLC } from './channels/ohlc'
import { Book } from './channels/book'

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
