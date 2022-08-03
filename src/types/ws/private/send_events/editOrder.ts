import type { BaseEvent, BaseEventResponse } from '..'

/* https://docs.kraken.com/websockets/#message-editOrder */

export type SendEvent = BaseEvent & {
    event: 'editOrder';
    userref?: string;
    orderid: string;
    pair: string;
    price?: string;
    price2?: string;
    volume: string;
    oflags?: string;
    newuserref?: string;
    validate?: boolean;
}

export type EventResponse = BaseEventResponse & {
    event: 'editOrderStatus';
    descr: string;
    txid: string;
    originaltxid: string;
    errorMessage: string;
}
