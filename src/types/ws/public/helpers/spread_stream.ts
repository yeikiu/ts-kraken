import type { ReplaySubject } from "rxjs";
import type { IWSSpreadSnapshot } from "../../..";

export type SpreadStream = {
    spreadSnapshot$: ReplaySubject<IWSSpreadSnapshot>;
    getLastSpread: () => IWSSpreadSnapshot;
    spreadStreamUnsubscribe: () => void;
}
