/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/edit-order | Edit Order}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'EditOrder',
        data: {
            pair: "XBTUSD",
            txid: "OHYO67-6LP66-HMQ437",
            volume: "1.25",
            price: "27500",
            price2: "26500"
        }
    }).then(({ olduserref, newuserref }) => {
        console.log({ olduserref, newuserref });
    });
 * ```
 */
export type Endpoint = 'EditOrder';

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
}
