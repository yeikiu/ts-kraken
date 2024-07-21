/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-ticker-information | Get Ticker Information}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({ url: 'Ticker'})
        .then((allAssetTickers) => {
            console.log({ allAssetTickers })
        })

    PublicRest.publicRestRequest({
        url: 'Ticker',
        params: { pair: 'BTCUSD,ETHEUR' }
    }).then((btcAndEthTickers) => {
        console.log({ btcAndEthTickers });
    });
 * ```

 * @remarks
 * _Tip:_ This library implements the helper method {@link PublicRest.getTickers} which outputs a nicer object format.
 */
export type Endpoint = 'Ticker';

/** {@inheritDoc Endpoint} */
export type Params = {
    pair?: string;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    [pair: string]: {
        a: string[];
        b: string[];
        c: string[];
        v: string[];
        p: string[];
        t: number[];
        l: string[];
        h: string[];
        o: string;
    }
}
