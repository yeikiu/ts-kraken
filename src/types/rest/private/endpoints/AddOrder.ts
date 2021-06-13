import { IAddOrder } from '../../../add_order';
import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/addOrder */

export namespace AddOrder {
    export type Params = {
        userref?: number;
    } & IAddOrder;

    export type Response = RESTResponse<Result>

    export type Result = {
        txid: string[];
        descr: {
            order: string;
            close: string;
        };
    }
}
