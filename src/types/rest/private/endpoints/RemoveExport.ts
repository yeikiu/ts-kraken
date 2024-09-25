/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/remove-export | Delete Export Report}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'RemoveExport',
        data: { id: 'YOUR_EXPORT_ID', type: 'cancel' }
    }).then(({ cancel }) => {
        if (cancel) {
            console.log('Export cancelled successfully!');
        } else {
            console.log('Oooops! Can\'t cancel export.');
        }
    });
 * ```
 */
export namespace RemoveExport {

    /**
     * @ignore
     */
    export type Endpoint = 'RemoveExport';

    /** {@inheritDoc RemoveExport} */
    export type Params = {
        id: string;
        type: 'delete' | 'cancel';
    };

    /** {@inheritDoc RemoveExport} */
    export type Result = {
        delete: boolean;
        cancel: boolean
    };
}
