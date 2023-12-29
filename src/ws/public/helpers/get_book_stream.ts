import { getPublicSubscription } from '../public_ws_client'
import { filter } from 'rxjs/operators'
import { ReplaySubject } from 'rxjs'

import type { IWSBookSnapshot, PublicWS } from '../../../types'
import { ValidDepth } from '../../../types/ws/public/channels/book'

interface GetBookStreamParams {
  baseAsset: string
  quoteAsset: string
  depth: ValidDepth
}

/**
 * Returns a set of useful Observables/Objects around the book PUBLIC-WS channel
 *
 * Helper method for: {@link https://docs.kraken.com/websockets/#message-book | message-book}
 *
 * @param { baseAsset, quoteAsset } - getBookStream
 * @returns BookStream
 *
 * @beta
 */
export const getBookStream = ({ baseAsset, quoteAsset, depth = 10 }: GetBookStreamParams): PublicWS.Helpers.BookStream => {
  const pair = `${baseAsset}/${quoteAsset}`.toUpperCase()
  const bookSnapshot$ = new ReplaySubject<IWSBookSnapshot>(1)
  let lastBook: IWSBookSnapshot = null

  const book$ = getPublicSubscription({
    channelName: 'book',
    pair: [pair],
    depth
  })

  const { unsubscribe: bookStreamUnsubscribe } = book$.pipe(
    filter(([, , channelName, receivedPair]) => receivedPair === pair && (channelName as string).startsWith('book-'))
  ).subscribe({
    next: rawKrakenPayload => {
      const [,
        {'as': _as, a, bs, b, c},
      ] = rawKrakenPayload

      lastBook = {
        asks: _as ?? a ?? lastBook?.asks ?? [],
        bids: bs ?? b ?? lastBook?.bids ?? [],
        checksum: c
      }
      return bookSnapshot$.next(lastBook)
    },
    error: bookStreamError => {
      bookSnapshot$.error(bookStreamError)
    }
  })

  return {
    bookSnapshot$,
    getLastBook: () => lastBook,
    bookStreamUnsubscribe
  }
}
