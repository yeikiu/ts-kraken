import { OwnTrades } from './channels/ownTrades'
import { OpenOrders } from './channels/openOrders'

/* PRIVATE */
export { OwnTrades, OpenOrders }
export namespace PrivateWS {
    export type Channel =
        'ownTrades' | 'openOrders' | 'addOrder' |
        'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter'
    
    export type BaseSubscription = {
        channelName: Channel;
    }

    export type Subscription = BaseSubscription & (OwnTrades.Subscription | OpenOrders.Subscription);

    export type Payload = OwnTrades.Payload | OpenOrders.Payload;
}
