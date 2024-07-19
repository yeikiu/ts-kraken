import { BaseSubscription, BaseUnsubscription } from "../../";

export namespace Balances {
  export type Subscription = BaseSubscription<{
    channel: "balances";
    snapshot?: boolean;
  }>;

  export type Unsubscription = BaseUnsubscription<{
    channel: "balances";
  }>;

  export type Update = {
    channel: "balances";
    type: "snapshot" | "update";
    data: any;
  }
}