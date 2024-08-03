import { RestOpenOrder } from './OpenOrders';

export type RestClosedOrder = RestOpenOrder & {
    closetm: number; // unix timestamp of when order was placed
    reason: string;
};

export type IRestClosedOrder = RestClosedOrder & { orderid: string; };

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-closed-orders | Get Closed Orders}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'ClosedOrders'
    }).then(({ closed: closedOrders }) => {
        console.log({ closedOrders })
    });
 * ```
 *
 * @remarks
 * ℹ️ _Tip:_ This library implements the helper method {@link PrivateRestHelpers.getClosedOrders} which outputs a nicer array of closed orders
 */
export namespace ClosedOrders {

    /**
     * @ignore
     */
    export type Endpoint = 'ClosedOrders';

    /** {@inheritDoc ClosedOrders} */
    export type Params = {
        trades?: boolean;
        userref?: number;
        start?: number | string;
        end?: number | string;
        ofs?: number;
        closetime?: 'open' | 'close' | 'both';
        consolidate_taker?: boolean;
    }

    /** {@inheritDoc ClosedOrders} */
    export type Result = {
        closed: Record<string, RestClosedOrder>;
    }
}
