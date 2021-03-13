import { Observable } from 'rxjs/internal/Observable'
import { PriceTicker } from '../../types/price_ticker'
import { publicWSClient } from '../public_ws_client'
import { filter, map } from 'rxjs/operators'
import { Subject } from 'rxjs'

type GetTickerStreamParams = {
    baseAsset: string;
    quoteAsset: string;
}

export type TickerStream = {
    priceTicker$: Observable<PriceTicker>;
    lastPrice$: Subject<string>;
}

//
// https://docs.kraken.com/websockets/#message-ticker
//
const getTickerStream = ({ baseAsset, quoteAsset }: GetTickerStreamParams): TickerStream => {
    const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
    const lastPrice$ = new Subject<string>()

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

    const priceTicker$ = priceTickerWS.pipe(filter(Boolean), map((rawKrakenPayload: any[]) => {
        const [,{ c: [price] }] = rawKrakenPayload
        lastPrice$.next(price)
        
        return {
            utcTimestamp: new Date().getTime(),
            pair,
            price,
            rawKrakenPayload
        } as PriceTicker
    }))
    priceTicker$.subscribe()

    return {
        priceTicker$,
        lastPrice$
    }
}

export {
    getTickerStream
}
