import { config } from 'dotenv'
config()
import { getClosedOrders, findClosedOrder } from './rest/private/helpers/get_closed_orders';
import { getOpenOrders } from './rest/private/helpers/get_open_orders';
import { getPairBalances } from './rest/private/helpers/get_pair_balances';
import { privateRESTRequest } from './rest/private/private_rest_request';
import { getTicker } from './rest/public/helpers/get_ticker';
import { publicRESTRequest } from './rest/public/public_rest_request';
import { getOpenOrdersStream } from './ws/private/helpers/get_open_orders_stream';
import { getPrivateSubscription, onPrivateWSClosed, WSPrivateHeartbeat$ } from './ws/private/private_ws_client';
import { getTickerStream } from './ws/public/helpers/get_ticker_stream';
import { getPublicSubscription, onPublicWSClosed, PublicWSHeartbeat$ } from './ws/public/public_ws_client';

export {
    /* PUBLIC WS */
    getPublicSubscription,
    onPublicWSClosed,
    PublicWSHeartbeat$,
    getTickerStream,

    /* PRIVATE WS */
    getPrivateSubscription,
    onPrivateWSClosed,
    WSPrivateHeartbeat$,
    getOpenOrdersStream,
    
    /* PUBLIC REST */
    publicRESTRequest,
    getTicker,

    /* PRIVATE REST */
    privateRESTRequest,
    getPairBalances,
    getOpenOrders,
    getClosedOrders,
    findClosedOrder,
}
