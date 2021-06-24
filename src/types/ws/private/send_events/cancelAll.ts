import type { BaseEvent, BaseEventResponse } from '..'

/* https://docs.kraken.com/websockets/#message-cancelAll */

export type SendEvent = BaseEvent & {
    event: 'cancelAll';
}

export type EventResponse = BaseEventResponse & {
    event: 'cancelAllStatus';
    count: number;
}
