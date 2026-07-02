export type RestLedgerEntryType = 'none' | 'trade' | 'deposit' | 'withdrawal' | 'transfer' | 'margin' | 'adjustment' | 'rollover' | 'spend' | 'receive' | 'settled' | 'credit' | 'staking' | 'reward' | 'dividend' | 'sale' | 'conversion' | 'nfttrade' | 'nftcreatorfee' | 'nftrebate' | 'custodytransfer';

export type RestLedgerEntry = {
    refid: string;
    time: number;
    type: RestLedgerEntryType;
    subtype?: string;
    aclass: string;
    asset: string;
    amount: string;
    fee: string;
    balance: string;
};

/**
 * Reference: {@link https://docs.kraken.com/api/docs/rest-api/get-ledgers-info | Get Ledgers Info}
 *
 * @example
 * ```ts 
    import { privateRestRequest } from 'ts-kraken';

    privateRestRequest({
        url: 'Ledgers',
    }).then(({ count, ledger }) => {
        console.log({ count, ledger });
    });
 * ```
 */
export namespace Ledgers {

    /**
     * @ignore
     */
    export type Endpoint = 'Ledgers';

    /** {@inheritDoc Ledgers} */
    export type Params = {
        asset?: string;
        aclass?: string;
        type?: 'all' | 'trade' | 'deposit' | 'withdrawal' | 'transfer' | 'margin' | 'adjustment' | 'rollover' | 'credit' | 'settled' | 'staking' | 'dividend' | 'sale' | 'nft_rebate';
        start?: number;
        end?: number;
        ofs?: number;
        without_count?: boolean;
    }

    /** {@inheritDoc Ledgers} */
    export type Result = {
        ledger: Record<string, RestLedgerEntry>;
        count: number;
    }
}
