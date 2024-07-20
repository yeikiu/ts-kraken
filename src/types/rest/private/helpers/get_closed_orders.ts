import { ClosedOrders } from '../endpoints';
import type { IOrderSnapshot } from '$types';

export type FindClosedOrderParam = {
    orderFilter: (f: Partial<IOrderSnapshot>) => boolean;
    maxOffset?: number;
    data?: ClosedOrders.Params
}
