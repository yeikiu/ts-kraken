/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/ping | Ping}
 * 
 * @example
 * ```ts 
    import { PublicRest } from 'ts-kraken';

    PublicWs.sendPublicEvent({ method: 'ping', req_id: 42 })
        .then(({ method, req_id, time_in, time_out }) => {
            console.log({ method, req_id, time_in, time_out });
        });
 * ```
 */
export namespace Ping {
    
    /** {@inheritDoc Ping} */
    export type Request = {
        method: 'ping';
        req_id?: number;
    }

    /** {@inheritDoc Ping} */
    export type Response = {
        method: 'pong';
        req_id: number;
        time_in: string;
        time_out: string;
    }
}
