/*
    https://docs.kraken.com/websockets/#message-book
*/

export type IWSBookSnapshot = {
    asks: string[][];
    bids: string[][];
    checksum: string;
}
