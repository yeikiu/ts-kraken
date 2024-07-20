import type { ReplaySubject } from 'rxjs';
import type { IWsBookSnapshot } from '$types';

export type BookStream = {
    bookSnapshot$: ReplaySubject<IWsBookSnapshot>;
    getLastBook: () => IWsBookSnapshot;
    bookStreamUnsubscribe: () => void;
}
