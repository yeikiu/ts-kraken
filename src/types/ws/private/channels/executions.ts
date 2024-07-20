/* https://docs.kraken.com/api/docs/websocket-v2/executions */

import { BaseSubscription, BaseUnsubscription } from '../..';

export namespace Executions {
    export type Subscription = BaseSubscription<{
        channel: 'executions';
        snap_trades?: boolean;
        snap_orders?: boolean;
        order_status?: boolean;
        ratecounter?: boolean;
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: 'executions';
    }>;

    export type Update = {
        channel: 'executions';
        type: 'snapshot' | 'update';
        data: {
            avg_price: number;
            cash_order_qty: number;
            cl_ord_id: string;
            contingent: {
                order_type: 'limit' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit';
                trigger_price: number;
                trigger_price_type: 'static' | 'pct' | 'quote';
                limit_price: number;
                limit_price_type: 'static' | 'pct' | 'quote';
            };
            cost: number;
            cum_cost: number;
            cum_qty: number;
            effective_time: string;
            exec_id: string;
            exec_type: 'pending_new' | 'new' | 'trade' | 'filled' | 'canceled' | 'expired' | 'restated' | 'status';
            expire_time: string;
            fee_usd_equiv: number;
            fee_ccy_pref: 'fcib' | 'fciq';
            fees: [{
                asset: string;
                qty: number;
            }]
            last_price: number;
            last_qty: number;
            limit_price: number;
            liquidity_ind: 'm' | 't';
            order_id: string;
            order_qty: number;
            order_status: 'pending_new' | 'new' | 'partially_filled' | 'filled' | 'canceled' | 'expired';
            order_type: 'limit' | 'market' | 'iceberg' | 'stop-loss' | 'stop-loss-limit' | 'take-profit' | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit' | 'settle-position';
            order_userref: number;
            position_status: 'opened' | 'closing' | 'closed';
            post_only: boolean;
            reason: string;
            reduce_only: boolean;
            sender_sub_id: string;
            side: 'buy' | 'sell';
            symbol: string;
            time_in_force: 'gtc' | 'gtd' | 'ioc';
            timestamp: string;
            trade_id: number;
            triggers: {
                reference: 'index' | 'last';
                price: number;
                price_type: 'static' | 'pct' | 'quote';
                actual_price: number;
                peak_price: number;
                last_price: number;
                status: 'triggered' | 'untriggered';
                timestamp: string;
            }
        };
        sequence: number; // TODO: report not in docs
    };
}
