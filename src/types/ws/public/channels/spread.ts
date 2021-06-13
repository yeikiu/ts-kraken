import { PublicWS } from '..'

export namespace Spread {
    
    export type Subscription = PublicWS.BaseSubscription & {
        channelName: 'spread';
    }

    export type Payload = Array<unknown>
}
