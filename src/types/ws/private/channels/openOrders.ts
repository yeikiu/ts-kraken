import { PrivateWS } from '../..'

export namespace OpenOrders {
    export type Subscription = PrivateWS.BaseSubscription & {
        ratecounter?: boolean;
    }
    export type Payload = Array<unknown>
}
