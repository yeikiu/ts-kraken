import type { BaseSubscription } from '..'

export type Subscription = BaseSubscription & {
    channelName: 'trade';
}

export type Payload = [
    number,
    [ string, string, string, 'b'|'s', 'm'|'l', string ][],
    string,
    string
    ]
