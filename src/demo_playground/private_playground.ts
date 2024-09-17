import { getClosedOrders, getWsAuthToken, privateWsSubscription, publicWsSubscription } from '..';

getWsAuthToken().then(async token => {
    console.log({ token });

    /* Fetch latest 50 closed orders and logs them */
    getClosedOrders()
        .then(lastClosedOrdersArr => {
            const closedOrders = lastClosedOrdersArr
                .map(({ orderid, descr: { order } }) => ({ orderid, order }));

            console.table(closedOrders);
        });


    /* Print any updates in the private `balances` channel */
    const balances$ = await privateWsSubscription({
        channel: 'balances',
        params: { snapshot: true }
    }, token); // Pass token here to save time as the library won't need to fetch one internally!

    balances$.subscribe(({ data }) => {
        console.table(data);
    });

}).catch(error => {
    console.log({ error });
});
