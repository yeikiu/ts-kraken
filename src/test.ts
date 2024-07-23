/* import { PublicWs } from '.';

PublicWs.sendPublicEvent({ method: 'ping', req_id: 42 })
    .then(({ method, req_id, time_in, time_out }) => {
        console.log({ method, req_id, time_in, time_out });
    }); */

import { PrivateWs } from '.';

PrivateWs.onPrivateWsOpen$.subscribe(() => {
    console.log('WebsocketV2 connection OPEN!\n');
});

PrivateWs.onPrivateWsClose$.subscribe(() => {
    console.log('WebsocketV2 connection CLOSE!\n');
});

PrivateWs.privateWsStatus$.subscribe(({ channel, data: [{ api_version, system }] }) => {
    console.log({ channel, api_version, system });
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

// PrivateWs.sendPrivateEvent({ method: 'add_order', params: {
//     validate: true,
//     order_type: 'limit',
//     side: 'buy',
//     order_qty: 0.0002,
//     symbol: 'BTC/EUR',
//     limit_price: 1000

// }}).then((raw) => {
//     console.log({ raw });
// });
