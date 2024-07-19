import { Balances } from "./channels/balances";
import { AddOrder } from "./requests/addOrder";

export { OpenOrdersStream } from './helpers/open_orders_stream'

export type ApiToken = string;
export type ApiCredentials = {
    apiKey: string;
    apiSecret: string;
};


/* REQUESTS */

export type PrivateRequest = AddOrder.Request

export type PrivateResponse<T extends PrivateRequest> =
    T extends AddOrder.Request ? AddOrder.Response : never;


/* CHANNELS */

export type PrivateSubscriptionChannel =
    Balances.Subscription['params']['channel'];

export type PrivateSubscription<T extends PrivateSubscriptionChannel> =
    T extends Balances.Subscription['params']['channel'] ? Balances.Subscription : never;

export type PrivateSubscriptionUpdate<T extends PrivateSubscriptionChannel> =
    T extends Balances.Subscription['params']['channel'] ? Balances.Update : never;

type OmitChannel<T extends PrivateSubscriptionChannel> = Omit<PrivateSubscription<T>['params'], 'channel'>; 
export type PrivateSubscriptionParams<T extends PrivateSubscriptionChannel> =
    T extends Balances.Subscription['params']['channel'] ? { params: OmitChannel<T> } : never
