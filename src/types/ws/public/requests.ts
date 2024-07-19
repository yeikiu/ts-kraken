/* https://docs.kraken.com/api/docs/websocket-v2/ping */


/* Admin */

export namespace Ping {
    export type Request = {
        method: "ping";
        req_id: number;
    }

    export type Response = {
        method: "pong";
        req_id: number;
    }
}
