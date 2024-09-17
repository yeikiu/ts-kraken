import { publicWsSubscription } from '..';

const runAsync = async () => {
    /* Track 5m candles updates */
    const fiveMinsBtcUsdCandles$ = publicWsSubscription({
        channel: 'ohlc',
        params: { symbol: ['BTC/USD'], interval: 5, snapshot: false }
    });

    fiveMinsBtcUsdCandles$.subscribe(({ data: [{ open, high, low, close }] }) => {
        console.log({ open, high, low, close });
    });
}

runAsync();