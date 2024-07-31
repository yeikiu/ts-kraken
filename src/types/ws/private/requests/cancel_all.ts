import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/cancel_all | Cancel All}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';

    privateWsRequest({ method: 'cancel_all' }).then(({ count }) => {
        console.log({ count });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace CancelAll {

    /** {@inheritDoc CancelAll} */
    export type Request = BasePrivateWsRequest<'cancel_all', never>;

    /** {@inheritDoc CancelAll} */
    export type Response = BasePrivateWsResponse<'cancel_all', {
        count: number;
        warnings: string[];
    }>;
}
