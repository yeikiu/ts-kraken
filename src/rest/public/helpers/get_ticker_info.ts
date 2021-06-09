import { Ticker } from '../../../types/rest'
import { publicRESTRequest } from '../public_rest_request'

/* https://www.kraken.com/features/api#get-ticker-info

    a = ask array(<price>, <whole lot volume>, <lot volume>),
    b = bid array(<price>, <whole lot volume>, <lot volume>),
    c = last trade closed array(<price>, <lot volume>),
    v = volume array(<today>, <last 24 hours>),
    p = volume weighted average price array(<today>, <last 24 hours>),
    t = number of trades array(<today>, <last 24 hours>),
    l = low array(<today>, <last 24 hours>),
    h = high array(<today>, <last 24 hours>),
    o = today's opening price
*/

export type PriceTicker = {
    utcTimestamp: number;
    pair: string;
    price: string;
    rawKrakenPayload: Ticker.Result;
}

export const getTickerInfo = async (pair: string): Promise<PriceTicker> => {
    const result = await publicRESTRequest({ url: 'Ticker', params: { pair }})
    
    const [pairKey,] = Object.keys(result)
    const ticker = result[pairKey]
    const { c: [price,] } = ticker || {}

    return {
        utcTimestamp: new Date().getTime(),
        pair,
        price,
        rawKrakenPayload: result
    }
}
