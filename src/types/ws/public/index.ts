import { Book, Instruments, Ohlc, Ticker, Trade } from './channels';
import { Ping } from './requests/ping';

export * as PublicChannels from './channels';
export * as PublicRequests from './requests';


/* REQUESTS */

export type PublicRequest = Ping.Request

export type PublicResponse<T extends PublicRequest> =
    T extends Ping.Request ? Ping.Response : never;


/* CHANNELS */

export type PublicSubscriptionChannel =
    Ticker.Subscription['params']['channel'] |
    Book.Subscription['params']['channel'] |
    Ohlc.Subscription['params']['channel'] |
    Trade.Subscription['params']['channel'] |
    Instruments.Subscription['params']['channel'];

export type PublicSubscription<T extends PublicSubscriptionChannel> =
    T extends Ticker.Subscription['params']['channel'] ? Ticker.Subscription :
    T extends Book.Subscription['params']['channel'] ? Book.Subscription :
    T extends Ohlc.Subscription['params']['channel'] ? Ohlc.Subscription :
    T extends Trade.Subscription['params']['channel'] ? Trade.Subscription :
    T extends Instruments.Subscription['params']['channel'] ? Instruments.Subscription : never;

export type PublicSubscriptionUpdate<T extends PublicSubscriptionChannel> =
    T extends Ticker.Subscription['params']['channel'] ? Ticker.Update :
    T extends Book.Subscription['params']['channel'] ? Book.Update :
    T extends Ohlc.Subscription['params']['channel'] ? Ohlc.Update :
    T extends Trade.Subscription['params']['channel'] ? Trade.Update :
    T extends Instruments.Subscription['params']['channel'] ? Instruments.Update : never;

/**
 * @internal 
 */
type OmitChannel<T extends PublicSubscriptionChannel> = Omit<PublicSubscription<T>['params'], 'channel'>;

export type PublicSubscriptionParams<T extends PublicSubscriptionChannel> =
    T extends Ticker.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Book.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Ohlc.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Trade.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Instruments.Subscription['params']['channel'] ? { params?: OmitChannel<T> } : never;
