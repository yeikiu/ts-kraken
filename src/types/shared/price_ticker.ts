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

import { Ticker as RestTicker } from '../rest/public/endpoints';
import { Ticker } from '$types/ws/public/channels';

type IPriceTicker = {
    utcTimestamp: number;
    pair: string;
    price: string;
}

export type IWsPriceTicker = IPriceTicker & {
    rawKrakenPayload: Ticker.Update;
}

export type IRestPriceTicker = IPriceTicker & {
    rawKrakenPayload: RestTicker.Result;
}
