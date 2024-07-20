import { publicRestRequest } from '../public_rest_request'
import { IRestPriceTicker } from '$types'

/**
 * Returns a nice pair ticker
 *
 * Helper method for: {@link https://docs.kraken.com/rest/#operation/getTickerInformation | getTickerInformation}
 *
 * @param pair - string
 * @returns IRestPriceTicker
 *
 * @beta
 */
export const getTicker = async (pair: string): Promise<IRestPriceTicker> => {
    const result = await publicRestRequest({ url: 'Ticker', params: { pair } })

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
