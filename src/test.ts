import { config } from 'dotenv';
config();

import { PrivateRest } from '.';

PrivateRest.privateRestRequest({
    url: 'ClosedOrders'
}).then(({ closed: closedOrders }) => {
    console.log({ closedOrders })
});
