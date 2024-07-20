import type { ReplaySubject } from 'rxjs';
import type { IWsTradeSnapshot } from '$types';

export type TradesStream = {
    lastTradeSnapshot$: ReplaySubject<IWsTradeSnapshot>;
    getLastTrade: () => IWsTradeSnapshot;
    tradesStreamUnsubscribe: () => void;
}
