import type { BaseSubscription } from '..'

export type ValidDepth = 10 | 25 | 100 | 500 | 1000

export type Subscription = BaseSubscription & {
    channelName: 'book';
    depth?: ValidDepth
}

export type Payload = Array<unknown>
