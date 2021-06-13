import { PublicWS } from '../../public'

export namespace Ticker {
    export type Subscription = PublicWS.BaseSubscription

    export type Payload = [
        number,
        {
            a: [string, number, string],
            b: [string, number, string],
            c: [string, string],
            v: [string, string],
            p: [string, string],
            t: [number, number],
            l: [string, string],
            h: [string, string],
            o: [string, string]
        },
        string,
        string
    ]
}
