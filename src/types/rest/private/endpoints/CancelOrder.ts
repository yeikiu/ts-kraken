/* https://docs.kraken.com/rest/#operation/cancelOrder */

export type Endpoint = 'CancelOrder';

export type Params = {
    txid: string | number;
}

export type Result = {
    count: number;
    pending: boolean;
}
