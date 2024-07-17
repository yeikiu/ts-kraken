/* https://docs.kraken.com/rest/#operation/cancelWithdrawal */

export type Endpoint = 'WithdrawCancel';

export type Params = {
    asset: string;
    refid: string;
}

export type Result = boolean;
