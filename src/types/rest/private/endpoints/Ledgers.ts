/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-account-balance | Get Account Balance}
 * 
 * @example
 * ```ts 
    import { PrivateRest } from 'ts-kraken';

    PrivateRest.privateRestRequest({
        url: 'Ledgers',
    }).then(({ count, ledger }) => {
        console.log({ count, ledger });
    });
 * ```
 */
export type Endpoint = 'Ledgers';

/** {@inheritDoc Endpoint} */
export type Params = {
    asset?: string;
    aclass?: string;
    type?: 'all' | 'deposit' | 'withdrawal' | 'tarde' | 'margin';
    start?: number;
    end?: number;
    ofs?: number;
    without_count?: boolean;
}

/** {@inheritDoc Endpoint} */
export type Result = {
    ledger: Record<string, {
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
    count: number;
}
