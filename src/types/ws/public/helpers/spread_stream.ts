import type { ReplaySubject } from "rxjs";
import type { IWsSpreadSnapshot } from "../../..";

export type SpreadStream = {
    spreadSnapshot$: ReplaySubject<IWsSpreadSnapshot>;
    getLastSpread: () => IWsSpreadSnapshot;
    spreadStreamUnsubscribe: () => void;
}
