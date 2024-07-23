/* https://docs.kraken.com/api/docs/websocket-v2/edit_order */

export namespace EditOrder {
  export type Request = {
    method: 'edit_order';
    req_id?: number;
    params: {
      order_id: string;
      symbol: string;
      deadline?: string;
      display_qty?: number;
      fee_preference?: 'base' | 'quote';
      limit_price?: number;
      no_mpp?: boolean;
      order_qty: number;
      order_userref?: number;
      post_only?: boolean;
      reduce_only?: boolean;
      triggers?: {
        price: number;
        reference?: 'index' | 'last';
        price_type?: 'static' | 'pct' | 'quote';
      };
      validate?: boolean;
    }
  }

  export type Response = {
    method: 'edit_order';
    req_id: number;
    result: {
      order_id: string;
      original_order_id: string;
      warnings: string[];
    };
    error: string;
    success: boolean;
    time_in: string;
    time_out: string;
  }
}
