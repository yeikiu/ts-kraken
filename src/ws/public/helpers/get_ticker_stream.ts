import { Ticker } from '../../../types/rest/public'
import { getPublicSubscription } from '../public_ws_client'
import { filter, map } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'
import { IPriceTicker } from '../../../types/price_ticker'

type GetPriceTickerParams = {
    baseAsset: string;
    quoteAsset: string;
}

export type TickerStream = {
    priceTicker$: ReplaySubject<IPriceTicker>;
    lastPrice$: ReplaySubject<string>;
    getLastPrice: () => string;
    priceTickerUnsubscribe: () => void;
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
export const getTickerStream = ({ baseAsset, quoteAsset }: GetPriceTickerParams): TickerStream => {
    const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
    const priceTicker$ = new ReplaySubject<IPriceTicker>(1)
    const lastPrice$ = new ReplaySubject<string>(1)
    let lastPrice: string = null

    const priceTickerWS = getPublicSubscription({
        channelName: 'ticker',
        pair: [pair],
    })
    
    const { unsubscribe: priceTickerUnsubscribe } = priceTickerWS.pipe(filter(Boolean), map((rawKrakenPayload: Ticker.Result) => {
        const { c: [price] } = rawKrakenPayload[pair]
        lastPrice$.next(price)
        lastPrice = price

        return {
            utcTimestamp: new Date().getTime(),
            pair,
            price,
            rawKrakenPayload
        }
    })).subscribe(priceTicker => { priceTicker$.next(priceTicker) }, priceTickerSteamError => {
        priceTicker$.error(priceTickerSteamError)
        lastPrice$.error(priceTickerSteamError)
    })

    const getLastPrice = () => lastPrice

    return {
        priceTicker$,
        lastPrice$,
        getLastPrice,
        priceTickerUnsubscribe
    }
}
