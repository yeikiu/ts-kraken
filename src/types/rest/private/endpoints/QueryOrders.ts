import { RestClosedOrder } from './ClosedOrders';
import { RestOpenOrder } from './OpenOrders';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-orders-info | Query Orders Info}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'QueryOrders',
        data: {
            txid: "YOUR-ORDER-ID1,YOUR-ORDER-ID2"
        }
    }).then(ordersData => {
        console.log({ ordersData });
    });
 * ```
 */
export namespace QueryOrders {

    /**
     * @ignore
     */
    export type Endpoint = 'QueryOrders';

    /** {@inheritDoc QueryOrders} */
    export type Params = {
        txid: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
        trades?: boolean;
        userref?: number;
        consolidate_taker?: boolean;
    }

    /** {@inheritDoc QueryOrders} */
    export type Result = Record<string, RestOpenOrder & Partial<Pick<RestClosedOrder, 'closetm' | 'reason'>> & {
        link_id?: string; // original-order txid in case this one derives from a previously edited order (undocumented)
    }>;
}
