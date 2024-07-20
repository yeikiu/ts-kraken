import { config } from 'dotenv';
config();

import { PublicRest } from '.';

PublicRest.publicRestRequest({ url: 'AssetPairs', params: { pair: 'BTC/USD,ETH/BTC' } })
    .then((assetPairs) => {
        console.log({ assetPairs })
    })
