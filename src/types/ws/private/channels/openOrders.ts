import type { BaseSubscription } from '..'
import type { IOrderSnapshot } from '../../..'

export type Subscription = BaseSubscription & {
    channelName: 'openOrders';
    ratecounter?: boolean;
}
export type Payload = [{
    [k: string]:
    Omit<IOrderSnapshot, 'orderid'> &
    Omit<IOrderSnapshot, 'price'> &
    Omit<IOrderSnapshot, 'reason'>
}[],
    'openOrders',
    { sequence: number }
];
