/* https://docs.kraken.com/api/docs/websocket-v2/ohlc */

import { BaseSubscription, BaseUnsubscription } from "../../";
import { ValidOhlcInterval } from "../../../shared/valid_ohlc_interval";

export namespace Ohlc {
  export type Subscription = BaseSubscription<{
    channel: "ohlc";
    snapshot?: boolean;
    symbol: string[];
    interval?: ValidOhlcInterval;
  }>;

  export type Unsubscription = BaseUnsubscription<{
    channel: "ohlc";
    symbol: string[];
    interval?: ValidOhlcInterval;
  }>;

  export type Update = {
    channel: "ohlc";
    type: "snapshot" | "update";
    data: {
      symbol: string;
      open: number;
      high: number;
      low: number;
      close: number;
      vwap: number;
      trades: number;
      volume: number;
      interval_begin: string;
      interval: number;
    }[];
  };
}
