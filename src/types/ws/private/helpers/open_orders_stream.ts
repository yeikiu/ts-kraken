import type { ReplaySubject, Subject } from "rxjs";

import type { IOrderSnapshot } from "../../..";

export type OpenOrdersStream = {
    openOrders$: ReplaySubject<IOrderSnapshot[]>;
    currentOpenOrdersMap: Map<string, IOrderSnapshot>;
    openOrderIn$: Subject<IOrderSnapshot>;
    closedOrderOut$: Subject<IOrderSnapshot>;
    closedOrdersIds: Set<string>;
    openOrdersUnsubscribe: () => void;
}
