import { OwnTrades } from './subscriptions/ownTrades'
import { OpenOrders } from './subscriptions/openOrders'
import { PrivateREST } from '../../rest/private'
import { AddOrder } from './send_events/addOrder'
import { CancelOrder } from './send_events/cancelOrder'
import { CancelAll } from './send_events/cancelAll'
import { CancelAllOrdersAfter } from './send_events/cancelAllOrdersAfter'

/* PRIVATE */
export { OwnTrades, OpenOrders }
export namespace PrivateWS {
    export type Channel =
        'ownTrades' | 'openOrders' | 'addOrder'

    export type BaseSubscription = {
        channelName: Channel;
    }
    
    export type Subscription = OwnTrades.Subscription | OpenOrders.Subscription;

    export type KeysOrToken = { injectedApiKeys?: PrivateREST.RuntimeApiKeys; wsToken?: string; };

    export type Payload = OwnTrades.Payload | OpenOrders.Payload;

    export type Event = 'addOrder' | 'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter';

    export type BaseEvent = {
        event: Event;
        reqid?: number;
    }

    export type SendEvent = AddOrder.SendEvent | CancelOrder.SendEvent | CancelAll.SendEvent | CancelAllOrdersAfter.SendEvent;

    type EventStatus = 'addOrderStatus' | 'cancelOrderStatus' | 'cancelAllStatus' | 'cancelAllOrdersAfterStatus';
    export type BaseEventResponse = {
        reqid: number;
        event: EventStatus;
        status: 'ok';
    }
    export type EventError = {
        errorMessage: string;
        event: EventStatus;
        status: 'error';
    }

    export type EventResponse = EventError | AddOrder.EventResponse | CancelOrder.EventResponse | CancelAll.EventResponse | CancelAllOrdersAfter.EventResponse;
}
