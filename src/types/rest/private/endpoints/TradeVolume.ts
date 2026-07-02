/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-trade-volume | Get Trade Volume}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
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
        fee_schedule?: boolean; // Include fee schedules in the response (optional)
        rebase_multiplier?: 'rebased' | 'base'; // Volume rebase multiplier mode (optional, default: 'rebased')
    }

    /** @ignore */
    export type FeeTierInfo = {
        fee: string;
        minfee: string;
        maxfee: string;
        nextfee: string | null;
        nextvolume: string | null;
        tiervolume: string;
        tierfuturesvolume?: string | null;
        nextfuturesvolume?: string | null;
        volumeoffset?: string | null;
    };

    /** {@inheritDoc TradeVolume} */
    export type Result = {
        currency: string;
        volume: string;
        inputs: {
            domain_spot_volume_30d: string;
            domain_futures_volume_30d: string;
            domain_assets_on_platform: string;
        };
        asset_class?: string | null;
        fees?: { [pair: string]: FeeTierInfo }; // only present when `pair` is requested
        fees_maker?: { [pair: string]: FeeTierInfo }; // only present when `pair` is requested
        volume_subaccounts?: { iiban: string; volume: string }[];
        schedules?: { // only present when `fee_schedule: true` is requested
            pair: string;
            class: string;
            tiers: {
                maker_fee: string;
                taker_fee: string;
                min_spot_volume?: string | null;
                min_futures_volume?: string | null;
                min_assets_on_platform?: string | null;
                active?: boolean | null;
            }[];
        }[];
    }
}
