import type { ReplaySubject } from "rxjs";
import type { IWSBookSnapshot } from "../../..";

export type BookStream = {
    bookSnapshot$: ReplaySubject<IWSBookSnapshot>;
    getLastBook: () => IWSBookSnapshot;
    bookStreamUnsubscribe: () => void;
}
