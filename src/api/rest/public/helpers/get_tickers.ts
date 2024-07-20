import { publicRestRequest } from '../public_rest_request';

/**
 * Returns a nice array of pair tickers
 * <br/><br/>Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-ticker-information | Get Ticker Information}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.getTickers('BTCUSD,ETHEUR').then(([btcTicker, ethTicker]) => {
        const { price: btcUsdPrice } = btcTicker;
        const { price: ethEurPrice } = ethTicker;

        console.log({ btcUsdPrice, ethEurPrice });
    });
 * ```
 */
export const getTickers = async (pair: string) => {
    const result = await publicRestRequest({ url: 'Ticker', params: { pair } });

    return Object.keys(result).map(pairKey => {
        const rawKrakenPayload = result[pairKey];
        const { c: [price] } = rawKrakenPayload || {};

        return {
            utcTimestamp: new Date().getTime(),
            pair: pairKey,
            price,
            rawKrakenPayload
        };
    });
};
