import type { ReplaySubject } from 'rxjs';

export type WatchPairPrice = {
    lastPairPrice$: ReplaySubject<string>;
    getLastPairPrice: () => string;
}
