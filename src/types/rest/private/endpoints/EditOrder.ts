/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/edit-order | Edit Order}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'EditOrder',
        data: {
            pair: "BTC/EUR",
            txid: "YOUR-ORDER-ID",
            price: "75500",
        }
    }).then(({ originaltxid, txid, orders_cancelled }) => {
        console.log({ originaltxid, txid, orders_cancelled });
    });
 * ```
 */
export namespace EditOrder {

    /**
     * @ignore
     */
    export type Endpoint = 'EditOrder';

    /** {@inheritDoc EditOrder} */
    export type Params = {
        userref?: number;
        txid: string | number;
        volume?: string;
        displayvol?: string;
        pair: string; // Asset pair id or altname
        price?: string;
        price2?: string;
        oflags?: string;
        deadline?: string;
        cancel_response?: boolean; // Used to interpret if client wants to receive pending replace, before the order is completely replaced
        validate?: boolean;
    };

    /** {@inheritDoc EditOrder} */
    export type Result = {
        txid: string;
        descr: {
            order: string;
        };
        newuserref: string; // Original userref if passed with the request
        olduserref: string; // Original userref if passed with the request
        orders_cancelled: number; // Number of orders cancelled (either 0 or 1)
        originaltxid: string; // Original transaction ID
        status: string; // Status of the order: Ok or Err
        volume: string; // Updated volume
        price: string; // Updated price
        price2: string; // Updated price2
        error_message: string;
        validation: string;
    };
}
