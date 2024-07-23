/* https://docs.kraken.com/api/docs/websocket-v2/cancel_all */

export namespace CancelAll {
    export type Request = {
        method: 'cancel_all';
        req_id?: number;
        params?: never;
    }

    export type Response = {
        method: 'cancel_all';
        req_id: number;
        result: {
            count: number;
            warnings: string[];
        };
        error: string;
        success: boolean;
        time_in: string;
        time_out: string;
    }
}
