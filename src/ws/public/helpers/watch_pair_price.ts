import { merge, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { WatchPairPrice } from '../../..'
import { getTickerStream } from './get_ticker_stream'
import { getTradesStream } from './get_trades_stream'

interface WatchPairPriceParams {
  baseAsset: string
  quoteAsset: string
}

/**
 * Returns a stream with the latest price update coming from a Ticker or a Trade snapshot
 *
 * @param { baseAsset, quoteAsset } - getTradesStream
 * @returns WatchPairPrice
 *
 * @beta
 */
export const watchPairPrice = ({ baseAsset, quoteAsset }: WatchPairPriceParams): WatchPairPrice => {
  const lastPairPrice$ = new ReplaySubject<string>(1)
  let lastPairPrice: string = null

  const { lastPrice$: lastTickerPrice$ } = getTickerStream({ baseAsset, quoteAsset })
  const { lastTradeSnapshot$ } = getTradesStream({ baseAsset, quoteAsset })
  const lastTradePrice$ = lastTradeSnapshot$.pipe(map(({ lastPrice }) => lastPrice))

  merge(lastTickerPrice$, lastTradePrice$).subscribe(lastPrice => {
    lastPairPrice = lastPrice
    lastPairPrice$.next(lastPairPrice)
  })

  return {
    lastPairPrice$,
    getLastPairPrice: () => lastPairPrice
  }
}
