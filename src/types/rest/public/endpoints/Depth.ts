/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-order-book | Get Order Book}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({ url: 'Depth', params: { pair: 'BTCUSD'}})
        .then(rawData => {
            const [pairKey] = Object.keys(rawData);
            const { asks, bids } = rawData[pairKey];

            console.log({ asks, bids })
        });
 * ```
 */
export namespace Depth {

    /**
     * @ignore
     */
    export type Endpoint = 'Depth';

    /** {@inheritDoc Depth} */
    export type Params = {
        pair: string;
        count?: number; // maximum number of asks/bids: 1 .. 500
    }

    /** {@inheritDoc Depth} */
    export type Result = {
        [pair: string]: {
            asks: [string, string, number];
            bids: [string, string, number];
        }
    }
}
