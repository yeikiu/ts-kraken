import { merge, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { getTickerStream } from './get_ticker_stream'
import { getTradesStream } from './get_trades_stream'

type WatchPairPriceParams = {
    baseAsset: string;
    quoteAsset: string;
}

/**
 * Returns a stream with the latest price update coming from a Ticker or a Trade snapshot
 *
 * @param { baseAsset, quoteAsset } - getTradesStream
 * @returns TradeStream
 *
 * @beta
 */
export const watchPairPrice = ({ baseAsset, quoteAsset }: WatchPairPriceParams): ReplaySubject<string> => {
    const lastPairPrice$ = new ReplaySubject<string>(1)

    const { lastPrice$: lastTickerPrice$ } = getTickerStream({ baseAsset, quoteAsset })
    const { lastTradeSnapshot$ } = getTradesStream({ baseAsset, quoteAsset })
    const lastTradePrice$ = lastTradeSnapshot$.pipe(map(({ lastPrice }) => lastPrice))

    merge(lastTickerPrice$, lastTradePrice$).subscribe(lastPrice => { lastPairPrice$.next(lastPrice) })

    return lastPairPrice$
}
