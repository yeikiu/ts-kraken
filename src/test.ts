import { PrivateWs } from '.';
const {getPrivateSubscription } = PrivateWs;

getPrivateSubscription({ channel: 'executions', params: { snap_orders: true} })
    .then(executions$ => {
        executions$.subscribe((executionData) => {
            console.log({ executionData });
        });
    });
