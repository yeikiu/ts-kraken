/* https://docs.kraken.com/websockets/#message-subscribe */

export type PublicChannel =
    'ticker' | 'ohlc' | 'trade' | 'spread' | 'book'

export type PrivateChannel =
    'ownTrades' | 'openOrders' | 'addOrder' |
    'cancelOrder' | 'cancelAll' | 'cancelAllOrdersAfter'

export type ValidInterval = 1 | '1' | 5 | '5' | 15 | '15' | 30 | '30' | 60 | '60' | 240 | '240' | 1440 | '1440' | 10080 | '10080' | 21600 | '21600'

export type ValidDepth = 10 | '10' | 25 | '25' | 100 | '100' | 500 | '500' | 1000 | '1000'
