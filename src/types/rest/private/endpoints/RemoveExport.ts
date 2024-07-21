/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/remove-export | Delete Export Report}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
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
export type Endpoint = 'RemoveExport';

/** {@inheritDoc Endpoint} */
export type Params = {
    id: string;
    type: 'delete' | 'cancel';
};

/** {@inheritDoc Endpoint} */
export type Result<T extends Params> = {
    delete: boolean;
    cancel: boolean
};
