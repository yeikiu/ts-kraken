import { config } from 'dotenv'
config()
import { getClosedOrders, findClosedOrder } from './rest/private/helpers/get_closed_orders';
import { getOpenOrders } from './rest/private/helpers/get_open_orders';
import { getPairBalances } from './rest/private/helpers/get_pair_balances';
import { privateRESTRequest } from './rest/private/private_rest_request';
import { getTicker } from './rest/public/helpers/get_ticker';
import { publicRESTRequest } from './rest/public/public_rest_request';
import { IAddOrder } from './types/add_order';
import { IOrderDescription, IOrderSnapshot } from './types/order_snapshot';
import { IPriceTicker } from './types/price_ticker';
import { PrivateREST } from './types/rest/private';
import { PublicREST } from './types/rest/public';
import { ValidOHLCInterval } from './types/valid_ohlc_interval';
import { PrivateWS } from './types/ws/private';
import { PublicWS } from './types/ws/public';
import { getOpenOrdersStream, OpenOrdersStream } from './ws/private/helpers/get_open_orders_stream';
import { gethWsAuthToken, getPrivateSubscription, onPrivateWSClosed, sendPrivateEvent, WSPrivateHeartbeat$ } from './ws/private/private_ws_client';
import { getTickerStream } from './ws/public/helpers/get_ticker_stream';
import { getPublicSubscription, onPublicWSClosed, WSPublicHeartbeat$ } from './ws/public/public_ws_client';

export {
    /* PUBLIC WS */
    getPublicSubscription,
    onPublicWSClosed,
    WSPublicHeartbeat$,
    getTickerStream,

    /* PRIVATE WS */
    gethWsAuthToken,
    getPrivateSubscription,
    onPrivateWSClosed,
    WSPrivateHeartbeat$,
    getOpenOrdersStream,
    sendPrivateEvent,
    
    /* PUBLIC REST */
    publicRESTRequest,
    getTicker,

    /* PRIVATE REST */
    privateRESTRequest,
    getPairBalances,
    getOpenOrders,
    getClosedOrders,
    findClosedOrder,

    /* TYPES */
    ValidOHLCInterval,
    IPriceTicker,
    IOrderSnapshot,
    IOrderDescription,
    IAddOrder,
    OpenOrdersStream,
    PublicWS,
    PrivateWS,
    PublicREST,
    PrivateREST,
}
