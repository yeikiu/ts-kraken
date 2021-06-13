import { PublicWS } from '..'

export namespace Trade {
    
    export type Subscription = PublicWS.BaseSubscription & {
        channelName: 'trade';
    }

    export type Payload = [
        number,
        [ string, string, string, 'b'|'s', 'm'|'l', string ][],
        string,
        string
      ]
}
