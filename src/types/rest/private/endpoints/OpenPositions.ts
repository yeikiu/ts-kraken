/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-open-positions | Get Open Positions}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
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
        type: 'buy' | 'sell';
        ordertype: 'market' | 'limit' | 'stop-loss' | 'take-profit' | 'stop-loss-limit' | 'take-profit-limit' | 'settle-position';
        cost: string;
        fee: string;
        vol: string;
        vol_closed: string;
        margin: string;
        value: string; // Current value of remaining position (if docalcs requested)
        net: string;
        terms: string;
        rollovertm: string;
        misc: string;
        oflags: string;
    }>;
}
