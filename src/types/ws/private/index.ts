import { Balances } from './channels/balances';
import { Executions } from './channels/executions';
import { Orders } from './channels/orders';
import { AddOrder } from './requests/add_order';
import { BatchAdd } from './requests/batch_add';
import { BatchCancel } from './requests/batch_cancel';
import { CancelAll } from './requests/cancel_all';
import { CancelOnDisconnect } from './requests/cancel_all_orders_after';
import { CancelOrder } from './requests/cancel_order';
import { EditOrder } from './requests/edit_order';

export * as PrivateChannels from './channels';
export * as PrivateRequests from './requests';

export type ApiToken = string;
export type ApiCredentials = {
    apiKey: string;
    apiSecret: string;
};


/* REQUESTS */

export type PrivateRequest =
    AddOrder.Request |
    EditOrder.Request |
    CancelOrder.Request |
    CancelAll.Request |
    CancelOnDisconnect.Request |
    BatchAdd.Request |
    BatchCancel.Request;

export type PrivateResponse<T extends PrivateRequest> =
    T extends AddOrder.Request ? AddOrder.Response :
    T extends EditOrder.Request ? EditOrder.Response :
    T extends CancelOrder.Request ? CancelOrder.Response :
    T extends CancelAll.Request ? CancelAll.Response :
    T extends CancelOnDisconnect.Request ? CancelOnDisconnect.Response :
    T extends BatchAdd.Request ? BatchAdd.Response :
    T extends BatchCancel.Request ? BatchCancel.Response : never;


/* CHANNELS */

export type PrivateSubscriptionChannel =
    Balances.Subscription['params']['channel'] |
    Orders.Subscription['params']['channel'];

export type PrivateSubscription<T extends PrivateSubscriptionChannel> =
    T extends Executions.Subscription['params']['channel'] ? Executions.Subscription :
    T extends Balances.Subscription['params']['channel'] ? Balances.Subscription :
    T extends Orders.Subscription['params']['channel'] ? Orders.Subscription : never;

export type PrivateSubscriptionUpdate<T extends PrivateSubscriptionChannel> =
    T extends Executions.Subscription['params']['channel'] ? Executions.Update :
    T extends Balances.Subscription['params']['channel'] ? Balances.Update :
    T extends Orders.Subscription['params']['channel'] ? Orders.Update : never;

type OmitChannel<T extends PrivateSubscriptionChannel> = Omit<PrivateSubscription<T>['params'], 'channel'>;

export type PrivateSubscriptionParams<T extends PrivateSubscriptionChannel> =
    T extends Executions.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Balances.Subscription['params']['channel'] ? { params: OmitChannel<T> } :
    T extends Orders.Subscription['params']['channel'] ? { params: OmitChannel<T> } : never
