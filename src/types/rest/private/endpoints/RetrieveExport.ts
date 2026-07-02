/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/retrieve-export | Retrieve Data Export}
 * 
 * @example
 * ```ts
    import { writeFileSync } from 'fs';
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'RetrieveExport',
        data: { id: 'YOUR_EXPORT_ID' }
    }).then((zipBuffer) => {
        writeFileSync('export.zip', zipBuffer);
    });
 * ```
 */
export namespace RetrieveExport {

    /**
     * @ignore
     */
    export type Endpoint = 'RetrieveExport';

    /** {@inheritDoc RetrieveExport} */
    export type Params = {
        id: string;
    }

    /**
     * Raw bytes of the export report ZIP archive.
     *
     * {@inheritDoc RetrieveExport}
     */
    export type Result = Buffer;
}
