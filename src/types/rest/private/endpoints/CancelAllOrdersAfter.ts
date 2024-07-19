/* https://docs.kraken.com/rest/#operation/cancelAllOrdersAfter */

export type Endpoint = 'CancelAllOrdersAfter';

export type Params = {
    timeout: number;
}

export type Result = {
    currentTime: string;
    triggerTime?: string;
}
