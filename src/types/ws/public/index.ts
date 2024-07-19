import { Instruments, Ohlc, Ticker } from './channels';
import { Ping } from './requests';


/* REQUESTS */

export type PublicRequest = Ping.Request

export type PublicResponse<T extends PublicRequest> =
    T extends Ping.Request ? Ping.Response : never;


/* CHANNELS */

export type PublicSubscriptionChannel =
    Instruments.Subscription['params']['channel'] |
    Ticker.Subscription['params']['channel'] |
    Ohlc.Subscription['params']['channel'];

export type PublicSubscription<T extends PublicSubscriptionChannel> =
    T extends Instruments.Subscription['params']['channel'] ? Instruments.Subscription :
    T extends Ticker.Subscription['params']['channel'] ? Ticker.Subscription :
    T extends Ohlc.Subscription['params']['channel'] ? Ohlc.Subscription : never;

export type PublicSubscriptionUpdate<T extends PublicSubscriptionChannel> =
    T extends Instruments.Subscription['params']['channel'] ? Instruments.Update :
    T extends Ticker.Subscription['params']['channel'] ? Ticker.Update :
    T extends Ohlc.Subscription['params']['channel'] ? Ohlc.Update : never;

type OmitChannel<T extends PublicSubscriptionChannel> = Omit<PublicSubscription<T>['params'], 'channel'>; 
export type PublicSubscriptionParams<T extends PublicSubscriptionChannel> =
    T extends Instruments.Subscription['params']['channel'] ? { params?: never } : 
    T extends Ticker.Subscription['params']['channel'] ? { params: OmitChannel<T> } : 
    T extends Ohlc.Subscription['params']['channel'] ? { params: OmitChannel<T> } : never
