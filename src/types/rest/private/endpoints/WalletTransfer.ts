import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/walletTransfer */

export type Params = {
    asset: string;
    from: 'Spot Wallet';
    to: 'Futures Wallet';
    amount: string;
}

export type Response = RESTResponse<Result>

export type Result = {
    refid: string;
}[]
