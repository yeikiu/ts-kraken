/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/add-export | Request Export Report}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'AddExport',
        data: { report: 'trades', description: 'my-csv-report' }
    }).then(({ id }) => {
        console.log(`Report id: ${id}`);
    });
 * ```
 */
export type Endpoint = 'AddExport';

/** {@inheritDoc Endpoint} */
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

/** {@inheritDoc Endpoint} */
export type Result = {
    id: string;
}
