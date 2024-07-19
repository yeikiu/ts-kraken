import type { RESTOrdersSnapshot } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOpenOrders */

export type Endpoint = 'OpenOrders';

export type Params = {
    trades?: boolean;
    userref?: number;
}

export type Result = {
    open: RESTOrdersSnapshot
}
