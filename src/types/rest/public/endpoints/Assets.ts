/* https://docs.kraken.com/rest/#operation/getAssetInfo */

export type Endpoint = 'Assets';

export type Params = {
    asset: string;
    aclass: string;
}

export type Result = {
    [asset: string]: {
        aclass: string;
        altname: string;
        decimals: number;
        display_decimals: number;
    }
}
