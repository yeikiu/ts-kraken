import type { ReplaySubject } from 'rxjs';
import type { IWsPriceTicker } from '$types';

export type TickerStream = {
    priceTicker$: ReplaySubject<IWsPriceTicker>;
    lastPrice$: ReplaySubject<string>;
    getLastPrice: () => string;
    priceTickerUnsubscribe: () => void;
}
