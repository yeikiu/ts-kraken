/* https://docs.kraken.com/rest/#operation/addExport */

export type Endpoint = 'AddExport';

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

export type Result = {
    id: string;
}
