import type { BaseSubscription } from '..'
import type { IOrderSide, IOrderType } from '../../..'

export type Subscription = BaseSubscription & {
    channelName: 'ownTrades';
    snapshot?: boolean;
}

export type Payload = [{
    [k: string]: {
        ordertxid: string; // order responsible for execution of trade
        postxid: string; //	Position trade id
        pair: string;
        time: number;
        type: IOrderSide;
        ordertype: IOrderType;
        price: string; //	decimal	average price order was executed at (quote currency)
        cost: string; //	decimal	total cost of order (quote currency)
        fee: string; //	decimal	total fee (quote currency)
        vol: string; // decimal	volume (base currency)
        margin: string; // decimal initial margin (quote currency)
        userref: number; // user reference ID
    }
}[],
    'ownTrades',
    { sequence: number }
];
