import { BaseSubscription, BaseUnsubscription } from '../../';

export namespace Balances {
  export type Subscription = BaseSubscription<{
    channel: 'balances';
    snapshot?: boolean;
  }>;

  export type Unsubscription = BaseUnsubscription<{
    channel: 'balances';
  }>;

  export type Update = {
    channel: 'balances';
    type: 'snapshot';
    data: {
      asset: string;
      asset_class: string;
      balance: number;
      wallets: {
        balance: number;
        type: 'spot' | 'earn';
        id: 'main' | 'flex' | 'bonded';
      }[];
    };
  } | {
    channel: 'balances';
    type: 'update';
    data: {
      asset: string;
      asset_class: string;
      amount: number;
      balance: number;
      fee: number;
      ledger_id: string;
      ref_id: string;
      timestamp: string;
      type: 'deposit' | 'withdrawal' | 'trade' | 'margin' | 'adjustment' | 'rollover' | 'credit' | 'transfer' | 'settled' | 'staking' | 'sale' | 'reserve' | 'conversion' | 'dividend' | 'reward' | 'creator_fee';
      subtype: 'spotfromfutures' | 'spottofutures' | 'stakingfromspot' | 'spotfromstaking' | 'stakingtospot' | 'spottostaking';
      category: 'deposit' | 'withdrawal' | 'trade' | 'margin-trade' | 'margin-settle' | 'margin-conversion' | 'conversion' | 'credit' | 'marginrollover' | 'staking-rewards' | 'instant' | 'equity-trade' | 'airdrop' | 'equity-dividend' | 'reward-bonus' | 'nft' | 'block-trade';
      wallet_type: 'spot' | 'earn';
      wallet_id: 'main' | 'flex' | 'bonded';
    };
  }
}
