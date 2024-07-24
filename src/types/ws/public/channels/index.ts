/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/status | Status}
 * 
 * @example
 * ```ts 
    import { PrivateWs } from 'ts-kraken';

    PrivateWs.privateWsStatus$.subscribe(({ channel, data: [{ api_version, system }] }) => {
        console.log({ channel, api_version, system });
    });
 * ```
 */
export namespace Status {
    export type Update = {
        channel: 'status';
        type: 'update';
        data: [
            {
                api_version: 'v2';
                connection_id: number;
                system: 'online' | 'cancel_only' | 'maintenance' | 'post_only';
                version: string;
            }
        ];
    };
}


/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/heartbeat | Heartbeat}
 * 
 * @example
 * ```ts
    import { PrivateWs } from 'ts-kraken';

    let lastHeartbeatTs: number = null;
    const maxSecondsWithoutHeartbeat = 10;
    PrivateWs.privateWsHeartbeat$.subscribe(() => {
        const now = new Date().getTime();
        if (lastHeartbeatTs) {
            const diff = (now - lastHeartbeatTs) / 1000;
            if (diff > maxSecondsWithoutHeartbeat) {
                throw `heartbeat timed out after ${maxSecondsWithoutHeartbeat} seconds`;
            }
        }
        lastHeartbeatTs = now;
    });
* ```
*/
export namespace Heartbeat {
    export type Update = {
        channel: 'heartbeat';
    };
}


/* Market Data */

export { Ticker } from './ticker';
export { Book } from './book';
export { Ohlc } from './ohlc';
export { Trades as Trade } from './trades';
export { Instruments } from './instruments';
