import { getPublicSubscription } from '../public_ws_client'
import { filter } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'

import type { IWSPriceTicker, PublicWS } from '../../../types'

interface GetPriceTickerParams {
  baseAsset: string
  quoteAsset: string
}

/**
 * Returns a set of useful Observables/Objects around the ticker PUBLIC-WS channel
 *
 * Helper method for: {@link https://docs.kraken.com/websockets/#message-ticker | message-ticker}
 *
 * @param { baseAsset, quoteAsset } - GetPriceTickerParams
 * @returns TickerStream
 *
 * @beta
 */
export const getTickerStream = ({ baseAsset, quoteAsset }: GetPriceTickerParams): PublicWS.Helpers.TickerStream => {
  const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
  const priceTicker$ = new ReplaySubject<IWSPriceTicker>(1)
  const lastPrice$ = new ReplaySubject<string>(1)
  let lastPrice: string = null

  const priceTickerWS = getPublicSubscription({
    channelName: 'ticker',
    pair: [pair]
  })

  const { unsubscribe: priceTickerUnsubscribe } = priceTickerWS.pipe(
    filter(([, , channelName, receivedPair]) => receivedPair === pair && channelName === 'ticker')
  ).subscribe({
    next: rawKrakenPayload => {
      const [, { c: [price = null] }] = rawKrakenPayload
      lastPrice$.next(price)
      lastPrice = price

      return priceTicker$.next({
        utcTimestamp: new Date().getTime(),
        pair,
        price,
        rawKrakenPayload
      })
    },
    error: priceTickerStreamError => {
      priceTicker$.error(priceTickerStreamError)
      lastPrice$.error(priceTickerStreamError)
    }
  })

  return {
    priceTicker$,
    lastPrice$,
    getLastPrice: () => lastPrice,
    priceTickerUnsubscribe
  }
}
