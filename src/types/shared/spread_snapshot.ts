/*
    https://docs.kraken.com/websockets/#message-spread
*/

export type IWSSpreadSnapshot = {
    spreadUTCts: number;
    spreadUTCDate: Date;
    bidPrice: string;
    bidVol: string;
    askPrice: string;
    askVol: string;
}
