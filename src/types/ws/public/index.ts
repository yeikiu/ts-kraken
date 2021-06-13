import { Ticker } from './channels/ticker'
import { OHLC } from './channels/ohlc'
import { Spread } from './channels/spread'
import { Book } from './channels/book'
import { Trade } from './channels/trade'

/* PUBLIC */
export { Ticker, OHLC, Book, Trade, Spread }
export namespace PublicWS {
    export type Channel =
        'ticker' | 'ohlc' | 'trade' | 'spread' | 'book'

    export type BaseSubscription = {
        channelName: Channel;
        pair: string[];
    }

    export type Subscription = Ticker.Subscription | OHLC.Subscription | Book.Subscription | Trade.Subscription | Spread.Subscription;

    export type Payload = Ticker.Payload | OHLC.Payload | Book.Payload | Trade.Payload | Spread.Payload;
}
