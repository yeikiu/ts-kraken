import type { IOrderSide, IOrderSnapshot, IOrderType } from '..';

export type RestResponse<T> = {
    error: string[];
    result: T;
}

export type RestOrdersSnapshot = {
    [txid: string]:
        Omit<IOrderSnapshot, 'orderid'> &
        Omit<IOrderSnapshot, 'avg_price'> &
        Omit<IOrderSnapshot, 'cancel_reason'> &
        Omit<IOrderSnapshot, 'ratecount'>;
}

export type RestTradesInfo = {[ordertxid: string]: {
    pair: string;
    time: number;
    type: IOrderSide;
    ordertype: IOrderType;
    price: string; // primary price
    cost: string; // total cost (quote currency unless unless viqc set in oflags)
    fee: string; // total fee (quote currency)
    vol: string; // volume of order (base currency unless viqc set in oflags)      
    margin: string;
    misc: string;
    posstatus: 'open' | 'closed';
    cprice: string;
    ccost: string;
    cfee: string; // total fee (quote currency)
    cvol: string; // volume of order (base currency unless viqc set in oflags)      
    cmargin: string;
    net: string;
    trades: string[];
}}

export type RestLedgerEntry = {[ledger_id: string]: {
    refid: string;
    time: number;
    type: 'trade' | 'deposit' | 'withdraw' | 'transfer' | 'margin' | 'rollover' | 'spend' | 'receive' | 'settled' | 'adjustment';
    subtype: string;
    aclass: string;
    asset: string;
    amount: string;
    fee: string;
    balance: string;
}}

export type RestFeeTierInfo = {
    fee: string;
    minfee: string;
    maxfee: string;
    nextfee: string;
    nextvolume: string;
    tiervolume: string;
}
