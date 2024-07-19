import type { RestOrdersSnapshot } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getClosedOrders */

export type Endpoint = 'ClosedOrders';

export type Params = {
    trades?: boolean;
    userref?: number;
    start?: number | string;
    end?: number | string;
    ofs?: number;
    closetime?: 'open' | 'close' | 'both';
}

export type Result = {
    closed: RestOrdersSnapshot
}
