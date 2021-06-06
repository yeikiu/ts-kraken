import { WebSocketSubject } from 'rxjs/webSocket';

/* https://docs.kraken.com/websockets/#message-subscribe */
type ValidInterval = 1 | '1' | 5 | '5' | 15 | '15' | 30 |'30' | 60 | '60' | 240 | '240' | 1440 | '1440' | 10080 | '10080' | 21600 | '21600';
type ValidDepth = 10 | '10' | 25 | '25' | 100 | '100' | 500 | '500' | 1000 | '1000';

export type SubscriptionHandlerParams = {
    wsClient: WebSocketSubject<unknown>;
    name: string;
    token?: string; // Mandatory for private streams
    pair?: string;
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

}), (response): boolean => true) //Array.isArray(response) && response.some(v => typeof v === 'string' && v.startsWith(name)))
