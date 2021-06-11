import { PrivateWS } from '../../private'

export namespace OwnTrades {
    export type Subscription = PrivateWS.BaseSubscription & {
        snapshot?: boolean;
    }

    export type Payload = Array<unknown>
}
