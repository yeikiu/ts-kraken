/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-ticker-information | Get Ticker Information}
 * 
 * @example
 * ```ts 
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({
        url: 'Ticker',
        params: { pair: 'ETHEUR,BTCUSD' },

    }).then((btcAndEthTickers) => {
        console.log({ btcAndEthTickers });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 *   
 * @remarks
 * _Tip:_ This library implements the helper method {@link PublicRestHelpers.getTickersPrices} which outputs a nicer object format.
 */
export namespace Ticker {

    /**
     * @ignore
     */
    export type Endpoint = 'Ticker';

    /** {@inheritDoc Ticker} */
    export type Params = {
        pair?: string;
    }

    /** {@inheritDoc Ticker} */
    export type Result = Record<string, {
        a: string[];
        b: string[];
        c: string[];
        v: string[];
        p: string[];
        t: number[];
        l: string[];
        h: string[];
        o: string;
    }>;
}
