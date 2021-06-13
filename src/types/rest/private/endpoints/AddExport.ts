import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/addExport */

export namespace AddExport {
    export type Params = {
        report: 'trades' | 'ledgers';
        format?: 'CSV' | 'TSV';
        description: string;
        fields?: string; /* Comma-delimited list of fields to include:
            > trades: ordertxid, time, ordertype, price, cost, fee, vol, margin, misc, ledgers
            > ledgers: refid, time, type, aclass, asset, amount, fee, balance */
        starttm?: number;
        endtm?: number;
    }

    export type Response = RESTResponse<Result>

    export type Result = {
        id: string;
    }
}
