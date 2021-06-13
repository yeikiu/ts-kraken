import { PublicWS } from '..'

export namespace Book {
    export type ValidDepth = 10 | 25 | 100 | 500 | 1000;

    export type Subscription = PublicWS.BaseSubscription & {
        channelName: 'book';
        depth?: ValidDepth
    }

    export type Payload = Array<unknown>
}
