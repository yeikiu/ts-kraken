/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-tradable-asset-pairs | Get Tradable Asset Pairs}
 * 
 * @example
 * ```ts 
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({ url: 'AssetPairs', params: { pair: 'BTC/USD,ETH/BTC' } })
        .then((assetPairs) => {
            console.log(JSON.stringify({ assetPairs }, null, 4));
        })
 * ```
 */
export namespace AssetPairs {

    /**
     * @ignore
     */
    export type Endpoint = 'AssetPairs';

    /** {@inheritDoc AssetPairs} */
    export type Params = {
        pair?: string; // Asset pairs to get data for. Example: pair=XXBTCZUSD,XETHXXBT
        info?: 'info' | 'leverage' | 'fees' | 'margin';
        country_code?: string;
    }

    /** {@inheritDoc AssetPairs} */
    export type Result = {
        [pair: string]: {
            altname: string;
            wsname: string;
            aclass_base: string;
            base: string;
            aclass_quote: string;
            quote: string;
            pair_decimals: number;
            cost_decimals: number;
            lot_decimals: number;
            lot_multiplier: number;
            leverage_buy: number[];
            leverage_sell: number[];
            fees: [number, number][];
            fees_maker: [number, number][];
            fee_volume_currency: string;
            margin_call: number;
            margin_stop: number;
            ordermin: string;
            costmin: string;
            tick_size: string;
            status: 'online' | 'cancel_only' | 'post_only' | 'limit_only' | 'reduce_only';
            long_position_limit: number;
            short_position_limit: number;
        }
    }
}
