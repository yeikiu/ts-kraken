import { BaseSubscription, BaseUnsubscription } from '../..';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/websocket-v2/instrument | Instruments}
 * 
 * @example
 * ```ts 
    import { PublicWs } from 'ts-kraken';

    PublicWs.getPublicSubscription({ channel: 'instrument' })
    .subscribe(({ data: { assets, pairs } }) => {
        console.log({ assets: assets.length, pairs: pairs.length });
    });
 * ```
 */
export namespace Instruments {

    /** {@inheritDoc Instruments} */
    export type Subscription = BaseSubscription<{
        channel: 'instrument';
        snapshot?: boolean;
    }>;

    /** {@inheritDoc Instruments} */
    export type Unsubscription = BaseUnsubscription<{
        channel: 'instrument';
    }>;

    /** {@inheritDoc Instruments} */
    export type Update = {
        channel: 'instrument';
        type: 'snapshot' | 'update';
        data: {
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
        };
    };
}
