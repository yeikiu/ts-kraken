/* https://docs.kraken.com/api/docs/websocket-v2/cancel_all_orders_after */

export namespace CancelOnDisconnect {
    export type Request = {
        method: "cancel_all_orders_after";
        req_id: number;
        params: {
            timeout: number;
        }
    }

    export type Response = {
        method: "cancel_all_orders_after";
        req_id: number;
        result: {
            currentTime: string;
            triggerTime: string;
            warnings: string[];
        };
        error: string;
        success: boolean;
        time_in: string;
        time_out: string;
    }
}
