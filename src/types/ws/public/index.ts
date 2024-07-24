import { Book, Instruments, Ohlc, Ticker, Trade } from './channels';
import { Ping } from './requests/ping';

export * as PublicChannels from './channels';
export * as PublicRequests from './requests';


/* REQUESTS */

/**
 * @ignore 
 */
export type PublicWsMethod = 'ping';

/**
 * @ignore 
 */
export type PublicRequest = Ping.Request

/**
 * @ignore 
 */
export type PublicResponse<T extends PublicRequest> =
    T extends Ping.Request ? Ping.Response : never;


/* CHANNELS */

export type PublicSubscriptionChannel =
    'ticker' |
    'book' |
    'ohlc' |
    'trade' |
    'instrument';

/**
 * @ignore 
 */
export type PublicSubscription<T extends PublicSubscriptionChannel> =
    T extends 'ticker' ? Ticker.Subscription :
    T extends 'book' ? Book.Subscription :
    T extends 'ohlc' ? Ohlc.Subscription :
    T extends 'trade' ? Trade.Subscription :
    T extends 'instrument' ? Instruments.Subscription : never;

/**
 * @ignore 
 */
export type PublicSubscriptionUpdate<T extends PublicSubscriptionChannel> =
    T extends 'ticker' ? Ticker.Update :
    T extends 'book' ? Book.Update :
    T extends 'ohlc' ? Ohlc.Update :
    T extends 'trade' ? Trade.Update :
    T extends 'instrument' ? Instruments.Update : never;

/**
 * @ignore 
 */
type OmitChannel<T extends PublicSubscriptionChannel> = Omit<PublicSubscription<T>['params'], 'channel'>;

/**
 * @ignore 
 */
export type PublicSubscriptionParams<T extends PublicSubscriptionChannel> =
    T extends 'ticker' ? { params: OmitChannel<T> } :
    T extends 'book' ? { params: OmitChannel<T> } :
    T extends 'ohlc' ? { params: OmitChannel<T> } :
    T extends 'trade' ? { params: OmitChannel<T> } :
    T extends 'instrument' ? { params?: OmitChannel<T> } : never;
