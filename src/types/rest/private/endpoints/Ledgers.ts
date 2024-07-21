export type RestLedgerEntry = Record<string, {
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

/* https://docs.kraken.com/rest/#operation/getLedgers */

export type Endpoint = 'Ledgers';

export type Params = {
    asset?: string;
    aclass?: string;
    type?: 'all' | 'deposit' | 'withdrawal' | 'tarde' | 'margin';
    start?: number;
    end?: number;
    ofs?: number;
    without_count?: boolean;
}

export type Result = {
    ledger: RestLedgerEntry,
    count: number;
}
