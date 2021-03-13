import { PriceTicker } from '../../types/price_ticker'
import { publicWSClient } from '../public_ws_client'
import { filter, map } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'

type GetPriceTickerParams = {
    baseAsset: string;
    quoteAsset: string;
}

export type PriceTickerStream = {
    priceTicker$: ReplaySubject<PriceTicker>;
    lastPrice$: ReplaySubject<string>;
    priceTickerUnsubscribe: () => void;
}

//
// https://docs.kraken.com/websockets/#message-ticker
//
export const getPriceTickerStream = ({ baseAsset, quoteAsset }: GetPriceTickerParams): PriceTickerStream => {
    const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
    const priceTicker$ = new ReplaySubject<PriceTicker>(1)
    const lastPrice$ = new ReplaySubject<string>(1)

    const priceTickerWS = publicWSClient.multiplex(() => ({
        event: 'subscribe',
        pair: [pair],
        subscription: {
            name: 'ticker'
        }
    }), () => ({
        event: 'unsubscribe',
        pair: [pair],
        subscription: {
            name: 'ticker'
        }
    }), (response): boolean => Array.isArray(response) && response.slice(-2).every(v => ['ticker', pair].includes(v)))

    const { unsubscribe: priceTickerUnsubscribe } = priceTickerWS.pipe(filter(Boolean), map((rawKrakenPayload: any[]) => {
        const [,{ c: [price] }] = rawKrakenPayload
        lastPrice$.next(price)
        
        return {
            utcTimestamp: new Date().getTime(),
            pair,
            price,
            rawKrakenPayload
        } as PriceTicker
    })).subscribe(priceTicker => { priceTicker$.next(priceTicker) }, priceTickerSteamError => {
        priceTicker$.error(priceTickerSteamError)
        lastPrice$.error(priceTickerSteamError)
    })

    return {
        priceTicker$,
        lastPrice$,
        priceTickerUnsubscribe
    }
}
