import { ValidOHLCInterval } from "../../.."
import { PublicWS } from "../../public"

export namespace OHLC {
    export type Subscription = PublicWS.BaseSubscription & {
        channelName: 'ohlc';
        interval?: ValidOHLCInterval
    }

    export type Payload = [
        number,
        [
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            number
        ],
        string,
        string
    ]
}
