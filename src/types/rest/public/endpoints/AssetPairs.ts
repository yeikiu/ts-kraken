/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-tradable-asset-pairs | Get Tradable Asset Pairs}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({ url: 'SystemStatus' })
        .then(({ status, timestamp }) => {
            console.log({ status, timestamp })
        })
 * ```
 */
export type Endpoint = 'AssetPairs';

/** {@inheritDoc Endpoint} */
export type Params = {
    pair?: string; // Asset pairs to get data for. Example: pair=XXBTCZUSD,XETHXXBT
    info?: 'info' | 'leverage' | 'fees' | 'margin';
    country_code?: string;
}

/** {@inheritDoc Endpoint} */
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
