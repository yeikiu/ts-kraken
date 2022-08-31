import type { IAddOrder } from '../../../shared/add_order';
import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/editOrder */

export type Params = {
    userref?: number;
    txid: string;
    volume?: string;
    pair: string; // Asset pair id or altname
    price?: string;
    price2?: string;
    oflags?: string;
    deadline?: string;
    cancel_response?: boolean; // Used to interpret if client wants to receive pending replace, before the order is completely replaced
    validate?: boolean;
};

export type Response = RESTResponse<Result>

export type Result = {
    txid: string;
    descr: {
        order: string;
    };
    newuserref: string; // Original userref if passed with the request
    olduserref: string; // Original userref if passed with the request
    orders_cancelled: number; // Number of orders cancelled (either 0 or 1)
    originaltxid: string; // Original transaction ID
    status: string; // Status of the order: Ok or Err
    volume: string; // Updated volume
    price: string; // Updated price
    price2: string; // Updated price2
    error_message: string;
}
