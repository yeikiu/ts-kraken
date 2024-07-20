import { config } from 'dotenv';
config();

import { PublicRest } from '.';

PublicRest.getTickers('BTCUSD,ETHEUR').then(([btcTicker, ethTicker]) => {
    const { price: btcUsdPrice } = btcTicker;
    const { price: ethEurPrice } = ethTicker;

    console.log({ btcUsdPrice, ethEurPrice });
});
