/* https://docs.kraken.com/rest/#operation/getStatusRecentDeposits */

export type Endpoint = 'DepositStatus';

export type Params = {
    asset: string;
    method?: string;
}

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
}[]
