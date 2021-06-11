import { OwnTrades } from './channels/ownTrades'
import { OpenOrders } from './channels/OpenOrders'

/* PRIVATE */
export { OwnTrades, OpenOrders }
export namespace PrivateWS {
    export type Channel =
        'ownTrades' | 'openOrders' | 'addOrder' |
        'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter'

    export type BaseSubscription = {
        channelName: Channel;
    }
    
    export type Subscription = BaseSubscription & Partial<OwnTrades.Subscription & OpenOrders.Subscription>
}
