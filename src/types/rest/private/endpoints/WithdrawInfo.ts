/* https://docs.kraken.com/rest/#operation/getWithdrawalInformation */

export type Endpoint = 'WithdrawInfo';

export type Params = {
    asset: string;
    key: string;
    amount: string;
}

export type Result = {
    method: string;
    limit: string;
    amount: string;
    fee: string;
}[]
