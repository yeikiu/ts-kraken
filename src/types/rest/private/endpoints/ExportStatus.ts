/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/export-status | Get Export Report Status}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';
        
    PrivateRest.privateRestRequest({
        url: 'ExportStatus',
        data: { report: 'trades' }
    }).then(([{ id, descr, status }]) => {
        console.log(`Report ${id} | ${descr} is ${status}`);
    });
 * ```
 */
export type Endpoint = 'ExportStatus';

/** {@inheritDoc Endpoint} */
export type Params = {
    report: 'trades' | 'ledgers';
}

/** {@inheritDoc Endpoint} */
export type Result = {
    id: string;
    descr: string;
    format: string;
    report: string;
    subtype: string;
    status: 'Queued' | 'Processing' | 'Processed';
    fields: string;
    createdtm: string;
    starttm: string;
    completedtm: string;
    datastarttm: string;
    dataendtm: string;
    asset: string;
}[]
