import type { ticker, ohlc, book, trade, spread } from './channels'

export * as Channels from './channels'
export * as Helpers from './helpers'

export type Channel = 'ticker' | 'ohlc' | 'trade' | 'spread' | 'book'

export type BaseSubscription = {
    channelName: Channel;
    pair: string[];
}

export type Subscription = ticker.Subscription | ohlc.Subscription | book.Subscription | trade.Subscription | spread.Subscription;

export type Payload = ticker.Payload | ohlc.Payload | book.Payload | trade.Payload | spread.Payload;
