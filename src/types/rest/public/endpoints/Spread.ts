/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-recent-spreads | Get Recent Spreads}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({
        url: 'Spread',
        params: { pair: 'BTCUSD' }
    }).then(rawData => {
        const [pairKey] = Object.keys(rawData);
        const spreadsArr = rawData[pairKey];

        console.log({ spreadsArr })
    });
 * ```
 */
export type Endpoint = 'Spread';

/** {@inheritDoc Endpoint} */
export type Params = {
    pair: string;
    since?: number;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    [pair: string]: [number, string, string][];
    
} & { last: number; } // ID to be used as since when polling for new spread data
