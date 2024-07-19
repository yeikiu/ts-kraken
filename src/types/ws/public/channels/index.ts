/* Admin */

/* https://docs.kraken.com/api/docs/websocket-v2/heartbeat */
export namespace Heartbeat {
  export type Update = {
    channel: "heartbeat";
  };
}

/* https://docs.kraken.com/api/docs/websocket-v2/status */
export namespace Status {
  export type Update = {
    channel: 'status';
    type: "update";
    data: [
      {
        api_version: "v2";
        connection_id: number;
        system: 'online' | 'cancel_only' | 'maintenance' | 'post_only';
        version: string;
      }
    ];
  };
}


/* Market Data */

export { Instruments } from './instruments'
export { Ticker } from './ticker'
export { Ohlc } from './ohlc'
