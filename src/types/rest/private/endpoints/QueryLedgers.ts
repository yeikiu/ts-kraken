/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-ledgers-info | Query Ledgers}
 * 
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'QueryLedgers',
        data: { id: 'YOUR-LEDGER-ID1,YOUR-LEDGER-ID2' }
    }).then((ledgersData) => {
        console.log(ledgersData);
    });
 * ```
 */
export namespace QueryLedgers {

    /**
     * @ignore
     */
    export type Endpoint = 'QueryLedgers';

    /** {@inheritDoc QueryLedgers} */
    export type Params = {
        id: string; // Comma delimited list of transaction IDs to query info about (20 maximum)
        trades?: boolean;
    }

    /** {@inheritDoc QueryLedgers} */
    export type Result = Record<string, {
        refid: string;
        time: number;
        type: 'trade' | 'deposit' | 'withdraw' | 'transfer' | 'margin' | 'rollover' | 'spend' | 'receive' | 'settled' | 'adjustment';
        subtype: string;
        aclass: string;
        asset: string;
        amount: string;
        fee: string;
        balance: string;
    }>;
}
