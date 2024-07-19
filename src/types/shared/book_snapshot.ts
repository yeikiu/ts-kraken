/*
    https://docs.kraken.com/websockets/#message-book
*/

export type IWsBookSnapshot = {
    asks: string[][];
    bids: string[][];
    checksum: string;
}
