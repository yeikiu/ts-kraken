import { OwnTrades } from './channels/ownTrades'
import { OpenOrders } from './channels/openOrders'
import { PrivateREST } from '../../rest/private'

/* PRIVATE */
export { OwnTrades, OpenOrders }
export namespace PrivateWS {
    export type Channel =
        'ownTrades' | 'openOrders' | 'addOrder' |
        'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter'

    export type Subscription = OwnTrades.Subscription | OpenOrders.Subscription;

    export type KeysOrToken = { injectedApiKeys?: PrivateREST.RuntimeApiKeys; wsToken?: string; };

    export type Payload = OwnTrades.Payload | OpenOrders.Payload;
}
