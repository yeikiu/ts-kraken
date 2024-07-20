/* https://docs.kraken.com/api/docs/websocket-v2/trade */

import { BaseSubscription, BaseUnsubscription } from "../..";

export namespace Trades {
    export type Subscription = BaseSubscription<{
        channel: "trade";
        snapshot?: boolean;
        symbol: string[];
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: "trade";
        symbol: string[];
    }>;

    export type Update = {
        channel: "trade";
        type: "snapshot" | "update";
        data: {
            symbol: string;
            side: "sell" | "buy";
            qty: number;
            price: number;
            ord_type: string;
            trade_id: number;
            timestamp: string;
        }[];
    };
}
