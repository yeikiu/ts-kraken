/* https://docs.kraken.com/rest/#operation/exportStatus */

export type Endpoint = 'ExportStatus';

export type Params = {
    report: 'trades' | 'ledgers';
}

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
