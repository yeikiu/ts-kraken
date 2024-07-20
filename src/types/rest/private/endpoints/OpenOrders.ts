import { RestOrdersSnapshot } from '.';

/* https://docs.kraken.com/rest/#operation/getOpenOrders */

export type Endpoint = 'OpenOrders';

export type Params = {
    trades?: boolean;
    userref?: number;
}

export type Result = {
    open: RestOrdersSnapshot
}
