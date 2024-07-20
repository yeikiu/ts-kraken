/* https://docs.kraken.com/api/docs/websocket-v2/batch_cancel */

export namespace BatchCancel {
  export type Request = {
    method: 'batch_cancel';
    req_id: number;
    params: {
      orders: string[];
      cl_ord_id?: string[];
    }
  }

  export type Response = {
    method: 'batch_cancel';
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
