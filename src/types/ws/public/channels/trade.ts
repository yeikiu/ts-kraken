import { PublicWS } from '..'

export namespace Trade {
    
    export type Subscription = PublicWS.BaseSubscription & {
        channelName: 'trade';
    }

    export type Payload = Array<unknown>
}
