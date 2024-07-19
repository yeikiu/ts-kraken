/* https://docs.kraken.com/api/docs/websocket-v2/instrument */

import { BaseSubscription, BaseUnsubscription } from "../../";

export namespace Instruments {
  export type Subscription = BaseSubscription<{
    channel: "instrument";
  }>;

  export type Unsubscription = BaseUnsubscription<{
    channel: "instrument";
  }>;

  export type Update = {
    channel: "instrument";
    type: "snapshot" | "update";
    data: [
      {
        assets: {
          id: string;
          status: "depositonly" | "disabled" | "enabled" | "fundingtemporarilydisabled" | "withdrawalonly" | "workinprogress",
          precision: number;
          precision_display: 2,
          borrowable: boolean;
          collateral_value: number;
          margin_rate: number;
        }[],
        pairs: {
          symbol: string;
          base: string;
          quote: string;
          status: "cancel_only" | "delisted" | "limit_only" | "maintenance" | "online" | "post_only" | "reduce_only" | "work_in_progress";
          qty_precision: number;
          qty_increment: number;
          price_precision: number;
          cost_precision: number;
          has_index: true,
          cost_min: number;
          price_increment: number;
          qty_min: number;
        } & ({
          marginable: false;
        } | {
          marginable: true;
          margin_initial: number;
          position_limit_long: number;
          position_limit_short: number;
        })[],
      }
    ];
  };
}
