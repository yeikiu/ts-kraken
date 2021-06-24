import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getTradableAssetPairs */

export type Params = {
    pair?: string; // Asset pairs to get data for. Example: pair=XXBTCZUSD,XETHXXBT
    info?: 'info' | 'leverage' | 'fees' | 'margin';
}

export type Response = RESTResponse<Result>

export type Result = {
    [pair: string]: {
        altname: string;
        wsnamw: string;
        aclass_base: string;
        base: string;
        aclass_quote: string;
        quote: string;
        pair_decimals: number;
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
    }
}
