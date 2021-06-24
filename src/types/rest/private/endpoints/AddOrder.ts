import type { IAddOrder } from '../../../shared/add_order';
import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/addOrder */

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
