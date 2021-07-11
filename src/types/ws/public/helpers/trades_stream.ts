import type { ReplaySubject } from "rxjs";
import type { IWSTradeSnapshot } from "../../..";

export type TradesStream = {
    lastTradeSnapshot$: ReplaySubject<IWSTradeSnapshot>;
    getLastTrade: () => IWSTradeSnapshot;
    tradesStreamUnsubscribe: () => void;
}
