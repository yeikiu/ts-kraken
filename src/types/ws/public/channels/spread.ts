import type { BaseSubscription } from '..'

export type Subscription = BaseSubscription & {
    channelName: 'spread';
}

export type Payload = [
    number,
    [
        string,
        string,
        string,
        string,
        string
    ],
    string,
    string
]
