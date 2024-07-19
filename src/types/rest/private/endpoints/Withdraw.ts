/* https://docs.kraken.com/rest/#operation/withdrawFunds */

export type Endpoint = 'Withdraw';

export type Params = {
    asset: string;
    key: string;
    amount: string;
}

export type Result = {
    refid: string;
}
