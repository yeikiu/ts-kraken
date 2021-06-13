import { PrivateWS } from "..";

/* https://docs.kraken.com/websockets/#message-cancelOrder */

export namespace CancelOrder {
    export type SendEvent = PrivateWS.BaseEvent & {
        event: 'cancelOrder';
        txid: string[]; // Array of order IDs to be canceled. These can be user reference IDs.
    }

    export type EventResponse = PrivateWS.BaseEventResponse & {
        event: 'cancelOrderStatus';
    }
}
