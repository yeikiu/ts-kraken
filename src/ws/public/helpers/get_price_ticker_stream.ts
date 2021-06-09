import { Ticker } from '../../../types/rest'
import { publicWSClient } from '../public_ws_client'
import { filter, map } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'
import { subscriptionHandler } from '../../subscription_handler'
import { PriceTicker } from '../../..'

type GetPriceTickerParams = {
    baseAsset: string;
    quoteAsset: string;
}

export type PriceTickerStream = {
    priceTicker$: ReplaySubject<PriceTicker>;
    lastPrice$: ReplaySubject<string>;
    getLastPrice: () => string;
    priceTickerUnsubscribe: () => void;
}

//
// https://docs.kraken.com/websockets/#message-ticker
//
export const getPriceTickerStream = ({ baseAsset, quoteAsset }: GetPriceTickerParams): PriceTickerStream => {
    const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
    const priceTicker$ = new ReplaySubject<PriceTicker>(1)
    const lastPrice$ = new ReplaySubject<string>(1)
    let lastPrice: string = null

    const priceTickerWS = subscriptionHandler({
        wsClient: publicWSClient,
        name: 'ticker',
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
