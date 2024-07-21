/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trade-volume | Get Trade Volume}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'TradeVolume',
        data: { pair: 'ADA/USD,ADA/EUR' }
    }).then(({ fees, fees_maker }) => {
        console.log(fees, fees_maker);
    });
 * ```
 */
export type Endpoint = 'TradeVolume';

/** {@inheritDoc Endpoint} */
export type Params = {
    pair?: string; //Comma delimited list of asset pairs to get fee info on (optional)
}

type RestFeeTierInfo = {
    fee: string;
    minfee: string;
    maxfee: string;
    nextfee: string;
    nextvolume: string;
    tiervolume: string;
};

/** {@inheritDoc Endpoint} */
export type Result = {
    currency: string;
    volume: string;
    fees: { [pair: string]: RestFeeTierInfo };
    fees_maker: { [pair: string]: RestFeeTierInfo };
}
