/*
    https://docs.kraken.com/websockets/#message-trade
*/

export type IWsTradeSnapshot = {
    lastTradeUTCts: number;
    lastTradeUTCDate: Date;
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    lastVol: string;
    lastPrice: string;
}
