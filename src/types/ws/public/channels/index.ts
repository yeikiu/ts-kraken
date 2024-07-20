/* Admin */


/* https://docs.kraken.com/api/docs/websocket-v2/status */

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


/* https://docs.kraken.com/api/docs/websocket-v2/heartbeat */

export namespace Heartbeat {
  export type Update = {
    channel: 'heartbeat';
  };
}


/* Market Data */

export { Ticker } from './ticker'
export { Book } from './book'
export { Ohlc } from './ohlc'
export { Trades as Trade } from './trades'
export { Instruments } from './instruments'
