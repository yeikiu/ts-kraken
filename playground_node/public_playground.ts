import { getTickersPrices, publicRestRequest, publicWsSubscription } from '../src';

const runAsync = async () => {

    /* Print asset pairs info */
    const assets = await publicRestRequest({ url: 'AssetPairs' });
    const pairKeys = Object.keys(assets);
    console.table(pairKeys.map(pair => {
        const { wsname, tick_size, pair_decimals, ordermin } = assets[pair];
        return { wsname, tick_size, pair_decimals, ordermin };
    }));

    /* Track 5m candles updates */
    const fiveMinsBtcUsdCandles$ = publicWsSubscription({
        channel: 'ohlc',
        params: { symbol: ['BTC/USD'], interval: 5, snapshot: false }
    });

    fiveMinsBtcUsdCandles$.subscribe(({ data: [{ open, high, low, close }] }) => {
        console.log({ open, high, low, close });
    });

    const [{ price: btcUsdPrice }, { price: ethEurPrice }] = await getTickersPrices('BTCUSD,ETHEUR');
    console.log({ btcUsdPrice, ethEurPrice });

    const allPairsTickers = await getTickersPrices();
    console.table(allPairsTickers);
};

runAsync();
