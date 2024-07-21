/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/retrieve-export | Retrieve Data Export}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'RetrieveExport',
        data: { id: 'YOUR_EXPORT_ID' }
    }).then((binaryDataZip) => {
        writeFileSync('export.zip',  binaryDataZip);
    });
 * ```
 */
export type Endpoint = 'RetrieveExport';

/** {@inheritDoc Endpoint} */
export type Params = {
    id: string;
}

/** {@inheritDoc Endpoint} */
export type Result = DataView;
