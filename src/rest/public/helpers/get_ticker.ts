import { IRESTPriceTicker } from '../../../types/price_ticker'
import { publicRESTRequest } from '../public_rest_request'

/**
 * Returns a nice pair ticker 
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getTickerInformation | getTickerInformation}
 *
 * @param pair - string
 * @returns IRESTPriceTicker
 *
 * @beta
 */
export const getTicker = async (pair: string): Promise<IRESTPriceTicker> => {
    const result = await publicRESTRequest({ url: 'Ticker', params: { pair }})
    
    const [pairKey] = Object.keys(result)
    const ticker = result[pairKey]
    const { c: [price] } = ticker || {}

    return {
        utcTimestamp: new Date().getTime(),
        pair,
        price,
        rawKrakenPayload: result
    }
}
