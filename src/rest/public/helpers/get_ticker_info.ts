import { PriceTicker } from '../../../types/price_ticker'
import { publicRESTRequest } from '../public_rest_request'

// 
// https://www.kraken.com/features/api#get-ticker-info
// 
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
