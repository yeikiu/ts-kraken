import { IOrderSnapshot } from "../order_snapshot"

export type RESTResponse<T> = {
    error: string[];
    result: T;
}

export type RESTOrdersSnapshot = {
    [txid: string]:
        Omit<IOrderSnapshot, 'orderid'> &
        Omit<IOrderSnapshot, 'avg_price'> &
        Omit<IOrderSnapshot, 'cancel_reason'>;
}

export type RESTTradesInfo = {[ordertxid: string]: {
    pair: string;
    time: number;
    type: 'buy' | 'sell';
    ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
    price: string; // primary price
    cost: string; // total cost (quote currency unless unless viqc set in oflags)
    fee: string; // total fee (quote currency)
    vol: string; // volume of order (base currency unless viqc set in oflags)      
    margin: string;
    misc: string;
    posstatus: 'open' | 'closed';
    cprice?: string;
    ccost?: string;
    cfee?: string; // total fee (quote currency)
    cvol?: string; // volume of order (base currency unless viqc set in oflags)      
    cmargin?: string;
    net?: string;
    trades?: string[];
}}

export type RESTLedgerEntry = {[ledger_id: string]: {
    refid: string;
    time: number;
    type: 'trade' | 'deposit' | 'withdraw' | 'transfer' | 'margin' | 'rollover' | 'spend' | 'receive' | 'settled' | 'adjustment';
    subtype?: string;
    aclass: string;
    asset: string;
    amount: string;
    fee: string;
    balance: string;
}}

export type RESTFeeTierInfo = {
    fee: string;
    minfee: string;
    maxfee: string;
    nextfee: string;
    nextvolume: string;
    tiervolume: string;
}
