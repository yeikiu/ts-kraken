import { getPublicSubscription } from '../public_ws_client'
import { filter, } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'

import type { IWSSpreadSnapshot, PublicWS } from '../../../types'

type GetSpreadStreamParams = {
    baseAsset: string;
    quoteAsset: string;
}

/**
 * Returns a set of useful Observables/Objects around the spread PUBLIC-WS channel
 *
 * Helper method for: {@link https://docs.kraken.com/websockets/#message-spread | message-spread}
 *
 * @param { baseAsset, quoteAsset } - getSpreadStream
 * @returns SpreadStream
 *
 * @beta
 */
export const getSpreadStream = ({ baseAsset, quoteAsset }: GetSpreadStreamParams): PublicWS.Helpers.SpreadStream => {
  const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
  const spreadSnapshot$ = new ReplaySubject<IWSSpreadSnapshot>(1)
  let lastSpread: IWSSpreadSnapshot = null

  const spread$ = getPublicSubscription({
    channelName: 'spread',
    pair: [pair],
  })

  const { unsubscribe: spreadStreamUnsubscribe } = spread$.pipe(
    filter(([, , channelName, receivedPair]) => receivedPair === pair && channelName === 'spread')
  ).subscribe({
    next: rawKrakenPayload => {
      const [,
        [
          bidPrice,
          askPrice,
          rawUtcTimestamp,
          bidVol,
          askVol
        ]
      ] = rawKrakenPayload

      const spreadUTCts = Number(`${rawUtcTimestamp.split('.')[0]}000`)
      const spreadUTCDate = new Date(spreadUTCts)

      const spreadSnapshot: IWSSpreadSnapshot = {
        spreadUTCts,
        spreadUTCDate,
        bidPrice,
        askPrice,
        bidVol,
        askVol,
      }

      lastSpread = spreadSnapshot
      return spreadSnapshot$.next(lastSpread)

    }, error: spreadStreamError => {
      spreadSnapshot$.error(spreadStreamError)
    }
  })

  const getLastSpread = () => lastSpread

  return {
    spreadSnapshot$,
    getLastSpread,
    spreadStreamUnsubscribe
  }
}
