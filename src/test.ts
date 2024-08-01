import { PrivateRestHelpers, privateWsSubscription } from '.';

PrivateRestHelpers.getWsAuthToken().then(async token => {
    console.log({ token });

    const balances$ = await privateWsSubscription({
        channel: 'balances',
        params: { snapshot: true }
    }, token); // Pass token here to save time as the method won't need to fetch one internally!

    balances$.subscribe(({data}) => {
        console.table(data);
    });

}).catch(error => {
    console.log({ error });
});
   