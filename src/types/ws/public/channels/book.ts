import type { BaseSubscription } from '..'

export type ValidDepth = 10 | 25 | 100 | 500 | 1000

export type Subscription = BaseSubscription & {
    channelName: 'book';
    depth?: ValidDepth
}

export type Payload = [
    number,
    {
        a: string[][],
        b: string[][],
        as: string[][],
        bs: string[][],
        c: string,
    },
    string,
    string
]
