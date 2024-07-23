/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/cancel-all-orders-after | Cancel All Orders After X}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'CancelAllOrdersAfter',
        data: {
            timeout: 120
        }
    }).then(({ currentTime, triggerTime }) => {
        console.log({ currentTime, triggerTime });
    });
 * ```
 */
export type Endpoint = 'CancelAllOrdersAfter';

/** {@inheritDoc Endpoint} */
export type Params = {
    timeout: number;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    currentTime: string;
    triggerTime: string;
}
