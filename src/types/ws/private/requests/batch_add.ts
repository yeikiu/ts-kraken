/* https://docs.kraken.com/api/docs/websocket-v2/batch_add */

export namespace BatchAdd {
  export type Request = {
    method: 'batch_add';
    req_id: number;
    params: {
      symbol: string;
      deadline?: string;
      validate?: boolean;
      orders: {
        side: 'buy' | 'sell';
        order_qty: number;
        order_type: 'limit' | 'market' | 'iceberg' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit' | 'settle-position';
        cash_order_qty?: number;
        conditional?: {
          order_type: 'limit' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
          limit_price?: number;
          limit_price_type?: 'static' | 'pct' | 'quote';
          trigger_price?: number;
          trigger_price_type?: 'static' | 'pct' | 'quote';
        }
        display_qty?: number;
        effective_time?: string;
        expire_time?: string;
        fee_preference?: 'base' | 'quote';
        limit_price?: number;
        limit_price_type?: 'static' | 'pct' | 'quote';
        margin?: boolean;
        no_mpp?: boolean;
        cl_ord_id?: string;
        order_userref?: number;
        post_only?: boolean;
        reduce_only?: boolean;
        stp_type?: 'cancel_newest' | 'cancel_oldest' | 'cancel_both';
        time_in_force?: 'gtc' | 'gtd' | 'ioc';
        triggers?: {
          price: number;
          reference?: 'index' | 'last';
          price_type?: 'static' | 'pct' | 'quote';
        };
        sender_sub_id?: string;
      }[];      
    }
  }

  export type Response = {
    method: 'batch_add';
    req_id: number;
    result: {
      order_id: string;
      cl_ord_id: string;
      order_userref: number;
      warnings: string[];
    };
    error: string;
    success: boolean;
    time_in: string;
    time_out: string;
  }
}
