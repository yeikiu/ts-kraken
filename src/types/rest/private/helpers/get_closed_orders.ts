import type { IOrderSnapshot } from "../../..";

export type GetClosedOrdersParams = {
    trades?: boolean;
    userref?: number;
    start?: number;
    end?: number;
    ofs?: number;
    closetime?: 'open' | 'close' | 'both';
};

export type FindClosedOrderParam = {
    orderFilter: (f: Partial<IOrderSnapshot>) => boolean;
    maxOffset?: number;
    data?: GetClosedOrdersParams
}
