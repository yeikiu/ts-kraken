import { PublicRestHelpers } from '.';

PublicRestHelpers.getTickersPrices('BTCUSD,ETHEUR')
    .then(([btcUsdTicker, ethEurTicker]) => {
        const { price: btcUsdPrice } = btcUsdTicker;
        const { price: ethEurPrice } = ethEurTicker;

        console.log({ btcUsdPrice, ethEurPrice });
    });
