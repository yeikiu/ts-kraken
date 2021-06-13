import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/addOrder */

export namespace AddOrder {
    export type Params = {
        userref?: number;
        ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
        type: 'buy' | 'sell';
        volume: string;
        pair: string; // Asset pair id or altname
        price: string;
        price2?: string;
        leverage?: string;
        oflags?: string;
        starttm?: string;
        expiretm?: string;
        close?: {
            ordertype?: 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit';
            price?: string;
            price2?: string;
        };
        trading_agreement?: 'agree';
        validate?: boolean;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        txid: string[];
        descr: {
            order: string;
            close: string;
        };
    }
}
