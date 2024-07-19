/*
    https://docs.kraken.com/websockets/#message-spread
*/

export type IWsSpreadSnapshot = {
    spreadUTCts: number;
    spreadUTCDate: Date;
    bidPrice: string;
    bidVol: string;
    askPrice: string;
    askVol: string;
}
