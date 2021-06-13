import { PrivateWS } from "..";
import { IAddOrder } from "../../../add_order";

/* https://docs.kraken.com/websockets/#message-addOrder */

export namespace AddOrder {
    export type SendEvent = PrivateWS.BaseEvent & {
        event: 'addOrder';
        userref?: string;
        deadline?: string; /* Optional - RFC3339 timestamp (e.g. 2021-04-01T00:18:45Z) after which matching engine should reject new order request, in presence of latency or order queueing. min now() + 5 seconds, max now() + 90 seconds. Defaults to 90 seconds if not specified. */
        timeinforce?: 'GTC' | 'IOC' | 'GTD'
    } & IAddOrder

    export type EventResponse = PrivateWS.BaseEventResponse & {
        event: 'addOrderStatus';
        descr: string;
        txid: string;
    }
}
