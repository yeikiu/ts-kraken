/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-asset-info | Get Asset Info}
 * 
 * @example
 * ```ts 
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({ url: 'Assets', params: { asset: 'XXBT,XETH' } })
        .then(({ XXBT, XETH }) => {
            console.log({ XXBT, XETH });
        });
 * ```
 */
export namespace Assets {

    /**
     * @ignore
     */
    export type Endpoint = 'Assets';

    /** {@inheritDoc Assets} */
    export type Params = {
        asset?: string; // Comma-delimited list of assets; defaults to all assets
        aclass?: string;
        assetVersion?: number;
    }

    /** {@inheritDoc Assets} */
    export type Result = {
        [asset: string]: {
            aclass: string;
            altname: string;
            decimals: number;
            display_decimals: number;
            collateral_value: number;
            margin_rate?: number;
            status: 'enabled' | 'deposit_only' | 'withdrawal_only' | 'funding_temporarily_disabled';
        }
    }
}
