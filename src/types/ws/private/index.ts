import type { addOrder, cancelAll, cancelAllOrdersAfter, cancelOrder } from './send_events'
import type { openOrders, ownTrades } from './channels'
import type { RuntimeApiKeys } from '../..'

export * as Channels from './channels'
export * as SendEvents from './send_events'
export * as Helpers from './helpers'

export type Channel =
    'ownTrades' | 'openOrders' | 'addOrder'

export type BaseSubscription = {
    channelName: Channel;
}

export type TokenOrKeys = RuntimeApiKeys & { wsToken?: string; };

export type Subscription = ownTrades.Subscription | openOrders.Subscription;

export type Payload = ownTrades.Payload | openOrders.Payload;

export type Event = 'addOrder' | 'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter';

export type BaseEvent = {
    event: Event;
    reqid?: number;
}

export type SendEvent = addOrder.SendEvent | cancelOrder.SendEvent | cancelAll.SendEvent | cancelAllOrdersAfter.SendEvent;

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

export type EventResponse = EventError | addOrder.EventResponse | cancelOrder.EventResponse | cancelAll.EventResponse | cancelAllOrdersAfter.EventResponse;
