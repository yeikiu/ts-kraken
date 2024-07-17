/* https://docs.kraken.com/rest/#operation/retrieveExport */

export type Endpoint = 'RetrieveExport';

export type Params = {
    id: string;
}

export type Result = BinaryData;
