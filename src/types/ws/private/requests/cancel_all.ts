import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/cancel_all | Cancel All}
 * 
 * @example
 * ```ts 
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.sendPrivateRequest({ method: 'cancel_all' }).then(({ count }) => {
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
