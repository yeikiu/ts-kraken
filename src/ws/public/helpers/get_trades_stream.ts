import { getPublicSubscription } from '../public_ws_client'
import { filter, } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'

import type { IWSTradeSnapshot, PublicWS } from '../../../types'

type GetTradesStreamParams = {
    baseAsset: string;
    quoteAsset: string;
}

/**
 * Returns a set of useful Observables/Objects around the trade PUBLIC-WS channel
 *
 * Helper method for: {@link https://docs.kraken.com/websockets/#message-trade | message-trade}
 *
 * @param { baseAsset, quoteAsset } - getTradesStream
 * @returns TradeStream
 *
 * @beta
 */
export const getTradesStream = ({ baseAsset, quoteAsset }: GetTradesStreamParams): PublicWS.Helpers.TradesStream => {
    const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
    const lastTradeSnapshot$ = new ReplaySubject<IWSTradeSnapshot>(1)
    let lastTrade: IWSTradeSnapshot = null

    const spread$ = getPublicSubscription({
        channelName: 'trade',
        pair: [pair],
    })

    const { unsubscribe: tradesStreamUnsubscribe } = spread$.pipe(
        filter(([, , channelName, receivedPair]) => receivedPair === pair && channelName === 'trade')
    ).subscribe(([,lastTrades]) => {
        const [lastPairTrade] = lastTrades.reverse()
        const [lastPrice, lastVol, rawLastTs, rawSide, rawType] = lastPairTrade
        
        const lastTradeUTCts = Number(`${rawLastTs.split('.')[0]}000`)
        const lastTradeUTCDate = new Date(lastTradeUTCts)
        const side = rawSide === 'b' ? 'buy' : 'sell'
        const type = rawType === 'l' ? 'limit' : 'market'

        lastTrade = {
            lastTradeUTCts,
            lastTradeUTCDate,
            type,
            side,
            lastVol,
            lastPrice
        }
        lastTradeSnapshot$.next(lastTrade)

    }, spreadStreamError => {
        lastTradeSnapshot$.error(spreadStreamError)
    })

    const getLastTrade = () => lastTrade

    return {
        lastTradeSnapshot$,
        getLastTrade,
        tradesStreamUnsubscribe
    }
}
