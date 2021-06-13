import { IOrderSnapshot } from '../../../order_snapshot'

export namespace OpenOrders {
    export type Subscription = {
        channelName: 'openOrders';
        ratecounter?: boolean;
    }
    export type Payload = [{ [k: string]:
    Omit<IOrderSnapshot, 'orderid'> &
    Omit<IOrderSnapshot, 'price'> }[], 'openOrders'];
}
