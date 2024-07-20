import type { IAddOrder } from '$types/shared/add_order';

/* https://docs.kraken.com/rest/#operation/addOrder */

export type Endpoint = 'AddOrder';

export type Params = {
    userref?: number;
} & IAddOrder;

export type Result = {
    txid: string[];
    descr: {
        order: string;
        close: string;
    };
}
