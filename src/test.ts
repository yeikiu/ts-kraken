/* import { PrivateWs } from '.'; */

/* PrivateWs.sendPrivateRequest({ method: 'add_order', params: {
    validate: true,
    order_type: 'limit',
    side: 'buy',
    order_qty: 0.0002,
    symbol: 'BTC/EUR',
    limit_price: 50000

}}).then(({ order_id }) => {
    console.log({ order_id });
    
}).catch(error => {
    console.error({ error });
}); */

/* 
PrivateWs.getPrivateSubscription({
    channel: 'balances',
    params: { snapshot: true }

}).then(balancesObservable$ => {
    balancesObservable$.subscribe(({ data: balancesData }) => {
        console.log({ balancesData });
    });
});

let lastHeartbeatTs: number = null;
const maxSecondsWithoutHeartbeat = 10;

PrivateWs.privateWsHeartbeat$.subscribe(() => {
    const now = new Date().getTime();

    if (lastHeartbeatTs) {
        const diff = (now - lastHeartbeatTs) / 1000;
        if (diff > maxSecondsWithoutHeartbeat) {
            throw `heartbeat timed out after ${maxSecondsWithoutHeartbeat} seconds`;
        }
    }

    lastHeartbeatTs = now;
});
 */