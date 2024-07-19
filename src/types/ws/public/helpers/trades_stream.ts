import type { ReplaySubject } from "rxjs";
import type { IWsTradeSnapshot } from "../../..";

export type TradesStream = {
    lastTradeSnapshot$: ReplaySubject<IWsTradeSnapshot>;
    getLastTrade: () => IWsTradeSnapshot;
    tradesStreamUnsubscribe: () => void;
}
