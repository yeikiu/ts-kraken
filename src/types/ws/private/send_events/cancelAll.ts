import { PrivateWS } from "..";

/* https://docs.kraken.com/websockets/#message-cancelAll */

export namespace CancelAll {
    export type SendEvent = PrivateWS.BaseEvent & {
        event: 'cancelAll';
    }

    export type EventResponse = PrivateWS.BaseEventResponse & {
        event: 'cancelAllStatus';
        count: number;
    }
}
