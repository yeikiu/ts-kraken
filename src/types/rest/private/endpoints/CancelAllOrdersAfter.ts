/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-all-orders-after | Cancel All Orders After X}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'CancelAllOrdersAfter',
        data: {
            timeout: 120
        }
    }).then(({ currentTime, triggerTime }) => {
        console.log({ currentTime, triggerTime });
    });
 * ```
 */
export namespace CancelAllOrdersAfter {

    /**
     * @ignore
     */
    export type Endpoint = 'CancelAllOrdersAfter';

    /** {@inheritDoc CancelAllOrdersAfter} */
    export type Params = {
        timeout: number;
    }

    /** {@inheritDoc CancelAllOrdersAfter} */
    export type Result = {
        currentTime: string;
        triggerTime: string;
    }
}
