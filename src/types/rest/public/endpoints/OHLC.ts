/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-ohlc-data | Get OHLC Data}
 * 
 * @example
 * ```ts 
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({ url: 'OHLC', params: { pair: 'BTCUSD' } })
        .then(rawData => {
            const [pairKey] = Object.keys(rawData);
            const [, open, high, low, close] = rawData[pairKey].pop();

            console.log({ open, high, low, close });
        });
 * ```
 */
export namespace OHLC {

    /**
     * @ignore
     */
    export type Endpoint = 'OHLC';

    /** {@inheritDoc OHLC} */
    export type Params = {
        pair: string;
        interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600;
        since?: number; // Return committed OHLC data since given ID
    }

    /** {@inheritDoc OHLC} */
    export type Result = {
        [pair: string]: [number, string, string, string, string, string, string, number][];

    } & { last: number; } // ID to be used as since when polling for new, committed OHLC data
}