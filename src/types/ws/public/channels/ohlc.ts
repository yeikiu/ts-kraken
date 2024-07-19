/* https://docs.kraken.com/api/docs/websocket-v2/ohlc */

import { BaseSubscription, BaseUnsubscription } from "../../";
import { ValidOhlcInterval } from "../../../shared/valid_ohlc_interval";

export namespace Ohlc {
    export type Subscription = BaseSubscription<{
        channel: "ohlc";
        symbol: string[];
        interval?: ValidOhlcInterval;
        snapshot?: boolean;
    }>;

    export type Unsubscription = BaseUnsubscription<{
        channel: "ohlc";
        symbol: string[];
        interval?: ValidOhlcInterval;
    }>;

    export type Update = {
        channel: "ohlc";
        type: "snapshot" | "update";
        data: any;
    };
}
