import { PublicWS } from '../../public'

export namespace Book {
    export type ValidDepth = 10 | '10' | 25 | '25' | 100 | '100' | 500 | '500' | 1000 | '1000'

    export type Subscription = PublicWS.BaseSubscription & {
        depth?: ValidDepth
    }

    export type Payload = Array<unknown>
}
