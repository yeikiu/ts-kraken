/* https://docs.kraken.com/api/docs/websocket-v2/cancel_order */

export namespace CancelOrder {
  export type Request = {
    method: "cancel_order";
    req_id: number;
    params: {
      order_id?: string[];
      cl_ord_id?: string[];
      order_userref?: number[]
    }
  }

  export type Response = {
    method: "cancel_order";
    req_id: number;
    result: {
      order_id: string;
      cl_ord_id: string;
      warnings: string[];
    };
    error: string;
    success: boolean;
    time_in: string;
    time_out: string;
  }
}
