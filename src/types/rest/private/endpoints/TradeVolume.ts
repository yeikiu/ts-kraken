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
        console.log({ fees, fees_maker });
    });
 * ```
 */
export namespace TradeVolume {

    /**
     * @ignore
     */
    export type Endpoint = 'TradeVolume';

    /** {@inheritDoc TradeVolume} */
    export type Params = {
        pair?: string; //Comma delimited list of asset pairs to get fee info on (optional)
    }

    /** {@inheritDoc TradeVolume} */
    export type Result = {
        currency: string;
        volume: string;
        fees: {
            [pair: string]: {
                fee: string;
                minfee: string;
                maxfee: string;
                nextfee: string;
                nextvolume: string;
                tiervolume: string;
            }
        };
        fees_maker: {
            [pair: string]: {
                fee: string;
                minfee: string;
                maxfee: string;
                nextfee: string;
                nextvolume: string;
                tiervolume: string;
            }
        };
    }
}
