/* https://docs.kraken.com/rest/#operation/getDepositMethods */

export type Endpoint = 'DepositMethods';

export type Params = {
    asset: string;
}

export type Result = {
    method: string;
    limit: string | false;
    fee: string;
    'address-setup-fee': string;
    'gen-address': boolean;
}[]
