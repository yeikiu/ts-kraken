import { config } from 'dotenv';
config();

import { PrivateRest } from '.';

PrivateRest.getOpenOrders().then(openOrdersArr => {
    const openOrdersIds = openOrdersArr.map(({ orderid }) => orderid);
    console.log({ openOrdersIds });
});
