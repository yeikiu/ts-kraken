import { BasePrivateWsRequest, BasePrivateWsResponse } from '..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/cancel_after | Cancel on Disconnect}
 * 
 * @example
 * ```ts 
    import { privateWsRequest } from 'ts-kraken';
        
    privateWsRequest({
        method: 'cancel_all_orders_after',
        params: { timeout: 5 }

    }).then(({ currentTime, triggerTime, warnings }) => {
        console.log({ currentTime, triggerTime, warnings });

    }).catch(error => {
        console.error({ error });
    });
 * ```
 */
export namespace CancelOnDisconnect {

    /** {@inheritDoc CancelOnDisconnect} */
    export type Request = BasePrivateWsRequest<'cancel_all_orders_after', {
        timeout: number;
    }>;

    /** {@inheritDoc CancelOnDisconnect} */
    export type Response = BasePrivateWsResponse<'cancel_all_orders_after', {
        currentTime: string;
        triggerTime: string;
        warnings: string[];
    }>;
}
