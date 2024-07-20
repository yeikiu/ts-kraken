import type { IOrderSide, IOrderType } from '$types'

/* https://docs.kraken.com/rest/#operation/getOpenPositions */

export type Endpoint = 'OpenPositions';

export type Params = {
    txid?: string;
    docalcs?: boolean;
    consolidation?: 'market'
}

export type Result = {[txid: string]: {
    ordertxid: string;
    posstatus: 'open';
    pair: string;
    time: number;
    type: IOrderSide;
    ordertype: IOrderType;
    cost: string;
    fee: string; 
    vol: string;
    vol_closed: string;
    margin: string;
    value?: string; // Current value of remaining position (if docalcs requested)
    net?: string;
    terms?: string;
    rollovertm: string;
    misc?: string;
    oflags?: string;
}}
