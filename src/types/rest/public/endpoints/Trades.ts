/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-recent-trades | Get Recent Trades}
 * 
 * @example
 * ```ts 
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({
        url: 'Trades',
        params: { pair: 'BTCUSD', count: 1 } // Fetch last trade only, default `count` if not passed is 1000.

    }).then(rawData => {
        const [pairKey] = Object.keys(rawData);
        const [[lastTradePrice]] = rawData[pairKey];
        
        console.log({ [pairKey]: lastTradePrice });
    });
 * ```
 */
export namespace Trades {

    /**
     * @ignore
     */
    export type Endpoint = 'Trades';

    /** {@inheritDoc Trades} */
    export type Params = {
        pair: string;
        since?: number;
        count?: number;
    }

    /** {@inheritDoc Trades} */
    export type Result = {
        [pair: string]: [string, string, number, string, string, string][];

    } & { last: string; } // ID to be used as since when polling for new trade data
}
