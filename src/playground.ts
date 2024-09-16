import { getWsAuthToken, privateWsSubscription, publicWsSubscription } from '.';

getWsAuthToken().then(async token => {
    console.log({ token });

    const balances$ = await privateWsSubscription({
        channel: 'balances',
        params: { snapshot: true }
    }, token); // Pass token here to save time as the library won't need to fetch one internally!

    // Print any updates in the private `balances` channel
    balances$.subscribe(({ data }) => {
        console.table(data);
    });

    const fiveMinsBtcUsdCandles$ = publicWsSubscription({
        channel: 'ohlc',
        params: { symbol: ['BTC/USD'], interval: 5, snapshot: false }
    });

    // Track 5m candles updates
    fiveMinsBtcUsdCandles$.subscribe(({ data: [{ open, high, low, close }] }) => {
        console.log({ open, high, low, close });
    });

}).catch(error => {
    console.log({ error });
});
