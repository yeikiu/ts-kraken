/* https://docs.kraken.com/api/docs/websocket-v2/instrument */

import { BaseSubscription, BaseUnsubscription } from '../..';

export namespace Instruments {
  export type Subscription = BaseSubscription<{
    channel: 'instrument';
    snapshot?: boolean;
  }>;

  export type Unsubscription = BaseUnsubscription<{
    channel: 'instrument';
  }>;

  export type Update = {
    channel: 'instrument';
    type: 'snapshot' | 'update';
    data: [
      {
        assets: {
          borrowable: boolean;
          collateral_value: number;
          id: string;
          margin_rate: number;
          precision: number;
          precision_display: 2;
          status: 'depositonly' | 'disabled' | 'enabled' | 'fundingtemporarilydisabled' | 'withdrawalonly' | 'workinprogress';
        }[],
        pairs: {
          base: string;
          quote: string;
          cost_min: number;
          cost_precision: number;
          has_index: true;
          margin_initial: number;
          marginable: boolean;
          position_limit_long: number;
          position_limit_short: number;
          price_increment: number;
          price_precision: number;
          qty_increment: number;
          qty_min: number;
          qty_precision: number;
          status: 'cancel_only' | 'delisted' | 'limit_only' | 'maintenance' | 'online' | 'post_only' | 'reduce_only' | 'work_in_progress';
          symbol: string;
        }[],
      }
    ];
  };
}
