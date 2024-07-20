import { config } from 'dotenv';
config();

import { PublicRest } from '.';

PublicRest.publicRestRequest({
    url: 'Spread',
    params: { pair: 'BTCUSD' }
}).then(rawData => {
    const [pairKey] = Object.keys(rawData);
    const spreadsArr = rawData[pairKey];

    console.log({ spreadsArr })
});
