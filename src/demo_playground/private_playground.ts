import { findClosedOrder, getWsAuthToken, privateWsSubscription } from '..';

getWsAuthToken().then(async token => {
    console.log({ token });

    /* Find the latest cancelled order */
    findClosedOrder({
        restData: { extra: { numOrders: 50 } },
        orderFilter: ({ userref }) => (userref?.toString() ?? '').startsWith('100033')
    }).then(lastCanceledOrder => {
        console.log({ lastCanceledOrder });
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
