// WS: https://docs.kraken.com/websockets/#message-addOrder
// REST API: https://docs.kraken.com/rest/#operation/addOrder

import type { IOrderType } from "./order_snapshot";

export type IAddOrderSide = 'buy' | 'sell';
export type IAddOrderCloseType = 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit';

export type IAddOrder = {
    ordertype: IOrderType;
    type: IAddOrderSide;
    volume: string;
    pair: string; // Asset pair id or altname
    price?: string;
    price2?: string;
    trigger?: 'last' | 'index';
    leverage?: string;
    stp_type?: 'cancel-newest' | 'cancel-oldest' | 'cancel-both';
    oflags?: string;
    timeinforce?: 'GTC' | 'IOC' | 'GTD';
    starttm?: string;
    expiretm?: string;
    close?: {
        ordertype?: IAddOrderCloseType;
        price?: string;
        price2?: string;
    };
    trading_agreement?: 'agree';
    /* deadline: RFC3339 timestamp (e.g. 2021-04-01T00:18:45Z) after which the matching engine should reject the new order request,
    in presence of latency or order queueing. min now() + 2 seconds, max now() + 60 seconds. */
    deadline?: string;
    validate?: boolean;
}
