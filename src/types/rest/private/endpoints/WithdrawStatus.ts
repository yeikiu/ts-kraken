import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getStatusRecentWithdrawals */

export type Params = {
    asset: string;
    method?: string;
}

export type Response = RESTResponse<Result>

export type Result = {
    method: string;
    aclass: string;
    asset: string;
    refid: string;
    txid: string;
    info: string;
    amount: string;
    fee: string;
    time: number;
    status: 'INITIAL' | 'PENDING' | 'SETTLED' | 'SUCCESS' | 'PARTIAL' | 'FAILURE';
    'status-prop': 'return' | 'onhold';
}
