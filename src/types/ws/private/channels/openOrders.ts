import { PrivateWS } from '../../private'
import { IOrderSnapshot } from '../../../order_snapshot'

export namespace OpenOrders {
    export type Subscription = PrivateWS.BaseSubscription & {
        ratecounter?: boolean;
    }
    export type Payload = [openOrders: { [k: string]:
    Omit<IOrderSnapshot, 'orderid'> &
    Omit<IOrderSnapshot, 'price'> }, channelName: 'openOrders'];
}
