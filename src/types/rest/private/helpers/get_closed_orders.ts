import type { IOrderSnapshot } from "../../..";
import { ClosedOrders } from "../endpoints";

export type FindClosedOrderParam = {
    orderFilter: (f: Partial<IOrderSnapshot>) => boolean;
    maxOffset?: number;
    data?: ClosedOrders.Params
}
