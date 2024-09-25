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


/* REQUESTS */

/**
 * @ignore 
 */
export type PrivateWsMethod =
    'add_order' |
    'batch_add' |
    'batch_cancel' |
    'cancel_all_orders_after' | 
    'cancel_all' |
    'cancel_order' |
    'edit_order';

/**
 * @ignore 
 */
export type BasePrivateWsRequest<M extends PrivateWsMethod, P> = 
    M extends 'cancel_all' ? {
        req_id?: number;
        method: M;
        params?: never;
    } : {
        req_id?: number;
        method: M;
        params: P;
    };

/**
 * @ignore 
 */
export type BasePrivateWsResponse<M extends PrivateWsMethod, R> = {
    method: M;
    req_id: number;
    time_in: string;
    time_out: string;
    success: boolean;
    result: R;
    error: string;
    // TODO: report M=`batch_cancel` is missing the `result` field in the response
    orders_cancelled: number;
};

export type PrivateWsRequest =
    AddOrder.Request |
    EditOrder.Request |
    CancelOrder.Request |
    CancelAll.Request |
    CancelOnDisconnect.Request |
    BatchAdd.Request |
    BatchCancel.Request;

export type PrivateWsResponse<T extends PrivateWsRequest> =
    T extends AddOrder.Request ? AddOrder.Response :
    T extends EditOrder.Request ? EditOrder.Response :
    T extends CancelOrder.Request ? CancelOrder.Response :
    T extends CancelAll.Request ? CancelAll.Response :
    T extends CancelOnDisconnect.Request ? CancelOnDisconnect.Response :
    T extends BatchAdd.Request ? BatchAdd.Response :
    T extends BatchCancel.Request ? BatchCancel.Response : never;


/* CHANNELS */

export type PrivateSubscriptionChannel =
    'executions' |
    'balances' |
    'level3';

/**
 * @ignore 
 */
export type PrivateSubscription<T extends PrivateSubscriptionChannel> =
    T extends 'executions' ? Executions.Subscription :
    T extends 'balances' ? Balances.Subscription :
    T extends 'level3' ? Orders.Subscription : never;

/**
 * @ignore 
 */
export type PrivateSubscriptionUpdate<T extends PrivateSubscriptionChannel> =
    T extends 'executions' ? Executions.Update :
    T extends 'balances' ? Balances.Update :
    T extends 'level3' ? Orders.Update : never;

type OmitChannel<T extends PrivateSubscriptionChannel> = Omit<PrivateSubscription<T>['params'], 'channel'>;

/**
 * @ignore 
 */
export type PrivateSubscriptionParams<T extends PrivateSubscriptionChannel> =
    T extends 'executions' ? { params?: OmitChannel<T> } :
    T extends 'balances' ? { params?: OmitChannel<T> } :
    T extends 'level3' ? { params: OmitChannel<T> } : never
