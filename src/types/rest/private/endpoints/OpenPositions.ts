import type { IOrderSide, IOrderType } from '../../..'
import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getOpenPositions */

export type Params = {
    txid?: string;
    docalcs?: boolean;
    consolidation?: 'market'
}

export type Response = RESTResponse<Result>

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
