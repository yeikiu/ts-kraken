import { ValidOHLCInterval } from "../../.."
import { PublicWS } from "../../public"

export namespace OHLC {
    export type Subscription = PublicWS.BaseSubscription & {
        pair: string[];
        interval?: ValidOHLCInterval
    }

    export type Payload = Array<unknown>
}
