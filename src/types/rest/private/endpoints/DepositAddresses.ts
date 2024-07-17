/* https://docs.kraken.com/rest/#operation/getDepositAddresses */

export type Endpoint = 'DepositAddresses';

export type Params = {
    asset: string;
    method: string;
    new?: boolean;
}

export type Result = {
    address: string;
    expiretm: string;
    new: boolean;
}[]
