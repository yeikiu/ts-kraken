import { PublicWS } from '../..'

export namespace Ticker {
    export type Subscription = PublicWS.BaseSubscription

    export type Payload = Array<unknown>
}
