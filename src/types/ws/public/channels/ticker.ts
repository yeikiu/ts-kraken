/* https://docs.kraken.com/api/docs/websocket-v2/ticker */

import { BaseSubscription, BaseUnsubscription } from "../../";

export namespace Ticker {
    export type Subscription = BaseSubscription<{
        channel: "ticker";
        symbol: string[];
        event_trigger?: 'bbo' | 'trades';
        snapshot?: boolean;
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: "ticker";
        symbol: string[];
    }>;

    export type Update = {
        channel: "ticker";
        type: "snapshot" | "update";
        data: any;
    };
}
