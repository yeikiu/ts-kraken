import type { ReplaySubject } from 'rxjs';
import type { IWsSpreadSnapshot } from '$types';

export type SpreadStream = {
    spreadSnapshot$: ReplaySubject<IWsSpreadSnapshot>;
    getLastSpread: () => IWsSpreadSnapshot;
    spreadStreamUnsubscribe: () => void;
}
