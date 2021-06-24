import type { ValidOHLCInterval } from '../../..'
import type { BaseSubscription } from '..'

export type Subscription = BaseSubscription & {
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
