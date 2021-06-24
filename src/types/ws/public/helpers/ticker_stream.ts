import type { ReplaySubject } from "rxjs";
import type { IWSPriceTicker } from "../../..";

export type TickerStream = {
    priceTicker$: ReplaySubject<IWSPriceTicker>;
    lastPrice$: ReplaySubject<string>;
    getLastPrice: () => string;
    priceTickerUnsubscribe: () => void;
}
