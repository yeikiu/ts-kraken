/* https://docs.kraken.com/rest/#operation/walletTransfer */

export type Endpoint = 'WalletTransfer';

export type Params = {
    asset: string;
    from: 'Spot Wallet';
    to: 'Futures Wallet';
    amount: string;
}

export type Result = {
    refid: string;
}[]
