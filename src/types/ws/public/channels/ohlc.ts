import { PublicWS } from "../../public"

export namespace OHLC {
    export type ValidInterval = 1 | '1' | 5 | '5' | 15 | '15' | 30 | '30' | 60 | '60' | 240 | '240' | 1440 | '1440' | 10080 | '10080' | 21600 | '21600'

    export type Subscription = PublicWS.BaseSubscription & {
        pair: string[];
        interval?: ValidInterval
    }

    export type Payload = Array<unknown>
}
