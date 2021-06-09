import { WebSocketSubject } from 'rxjs/webSocket'
import { PublicChannel, PrivateChannel, ValidInterval, ValidDepth } from '../types/ws_subscriptions'

/* https://docs.kraken.com/websockets/#message-subscribe */
export type SubscriptionHandlerParams = {
    wsClient: WebSocketSubject<unknown>;
    name: PublicChannel | PrivateChannel;
    token?: string; // Mandatory for private streams
    pair?: string[];
    interval?: ValidInterval;
    depth?: ValidDepth;
}

export const subscriptionHandler = ({ wsClient, name, token, pair, interval, depth }: SubscriptionHandlerParams) => wsClient.multiplex(() => ({

    event: 'subscribe',
    ...pair ? { pair } : {},
    subscription: {
        name,
        ...interval ? { interval: Number(interval) } : {},
        ...depth ? { depth: Number(depth) } : {},
        ...token ? { token } : {}
    },

}), () => ({

    event: 'unsubscribe',
    ...pair ? { pair } : {},
    subscription: {
        name,
        ...interval ? { interval: Number(interval) } : {},
        ...depth ? { depth: Number(depth) } : {},
        ...token ? { token } : {}
    },

}), (response): boolean => Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(name)))
