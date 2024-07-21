import { config } from 'dotenv';
config();

import { PrivateRest } from '.';

PrivateRest.privateRestRequest({
    url: 'Balance'
}).then(({ XXBT: btcBalance, ADA: adaBalance }) => {
    console.log({ btcBalance, adaBalance })
});
