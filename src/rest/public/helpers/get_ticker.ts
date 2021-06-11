import { IPriceTicker } from '../../..'
import { publicRESTRequest } from '../public_rest_request'

export const getTicker = async (pair: string): Promise<IPriceTicker> => {
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
