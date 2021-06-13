import { PrivateWS } from "..";

/* https://docs.kraken.com/websockets/#message-cancelAllOrdersAfter */

export namespace CancelAllOrdersAfter {
    export type SendEvent = PrivateWS.BaseEvent & {
        event: 'cancelAllOrdersAfter';
        timeout: number; // Timeout specified in seconds. 0 to disable the timer.
    }

    export type EventResponse = PrivateWS.BaseEventResponse & {
        event: 'cancelAllOrdersAfterStatus';
        currentTime: string;
        triggerTime: string;
    }
}
