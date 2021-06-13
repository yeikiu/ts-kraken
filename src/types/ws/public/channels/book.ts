import { PublicWS } from '../../public'

export namespace Book {
    export type ValidDepth = 10 | 25 | 100 | 500 | 1000;

    export type Subscription = PublicWS.BaseSubscription & {
        depth?: ValidDepth
    }

    export type Payload = Array<unknown>
}
