// https://www.kraken.com/features/api#get-trades-history

export type KrakenTradesHistoryItem = {
    tradeid: string; // Injected to original payload
    ordertxid: string;
    postxid: string;
    pair: string;
    type: 'buy' | 'sell';
    ordertype: string;
    price: string;
    cost: string;
    fee: string;
    vol: string;
    margin: string;
    misc: string;
    time: number;
    date: Date;
}
