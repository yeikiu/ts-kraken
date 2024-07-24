/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-system-status | Get System Status}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicRest.publicRestRequest({ url: 'SystemStatus' })
        .then(({ status, timestamp }) => {
            console.log({ status, timestamp })
        })
 * ```
 */
export namespace SystemStatus {

    /**
     * @ignore
     */
    export type Endpoint = 'SystemStatus';

    /** {@inheritDoc SystemStatus} */
    export type Result = {
        status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
        timestamp: string;
    }
}
