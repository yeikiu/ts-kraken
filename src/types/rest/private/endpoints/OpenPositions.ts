import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/getOpenPositions */

export namespace OpenPositions {
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
        type: 'buy' | 'sell';
        ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
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
}
