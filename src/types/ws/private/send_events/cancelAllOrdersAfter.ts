import type { BaseEvent, BaseEventResponse } from '..'

/* https://docs.kraken.com/websockets/#message-cancelAllOrdersAfter */

export type SendEvent = BaseEvent & {
    event: 'cancelAllOrdersAfter';
    timeout: number; // Timeout specified in seconds. 0 to disable the timer.
}

export type EventResponse = BaseEventResponse & {
    event: 'cancelAllOrdersAfterStatus';
    currentTime: string;
    triggerTime: string;
}
