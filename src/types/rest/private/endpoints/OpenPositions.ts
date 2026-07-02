import { RestOrderDirection, RestOrderType } from './OpenOrders';

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-open-positions | Get Open Positions}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'OpenPositions',
    }).then((openPositions) => {
        console.log({ openPositions });
    });
 * ```
 */
export namespace OpenPositions {

    /**
     * @ignore
     */
    export type Endpoint = 'OpenPositions';

    /** {@inheritDoc OpenPositions} */
    export type Params = {
        txid?: string;
        docalcs?: boolean;
        consolidation?: 'market'
    };

    /** {@inheritDoc OpenPositions} */
    export type Result = Record<string, {
        ordertxid: string;
        posstatus: 'open';
        pair: string;
        time: number;
        type: RestOrderDirection;
        ordertype: RestOrderType;
        cost: string;
        fee: string;
        vol: string;
        vol_closed: string;
        margin: string;
        value?: string; // Current value of remaining position (if docalcs requested)
        net?: string; // Unrealised P&L of remaining position (if docalcs requested)
        class?: string; // asset class
        terms: string;
        rollovertm: string;
        misc: string;
        oflags: string;
    }>;
}
