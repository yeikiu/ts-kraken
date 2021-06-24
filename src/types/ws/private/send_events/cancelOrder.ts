import type { BaseEvent, BaseEventResponse } from '..'

/* https://docs.kraken.com/websockets/#message-cancelOrder */

export type SendEvent = BaseEvent & {
    event: 'cancelOrder';
    txid: string[]; // Array of order IDs to be canceled. These can be user reference IDs.
}

export type EventResponse = BaseEventResponse & {
    event: 'cancelOrderStatus';
}
