import { findClosedOrder, getClosedOrders } from './rest/private/helpers/get_closed_orders'
import { privateRESTRequest } from './rest/private/private_rest_request'
import { getTicker } from './rest/public/helpers/get_ticker'
import { getOpenOrdersStream, OpenOrdersStream } from './ws/private/helpers/get_open_orders_stream'
import { gethWsAuthToken, onPrivateWSClosed, privateWSClient, WSPrivateHeartbeat$ } from './ws/private/private_ws_client'
import { getTickerStream } from './ws/public/helpers/get_ticker_stream'
import { onPublicWSClosed, publicWSClient, PublicWSHeartbeat$ } from './ws/public/public_ws_client'
import { IOrderSnapshot } from './types/order_snapshot'
import { IPriceTicker } from './types/price_ticker'
import { KrakenTradesHistoryItem } from './types/trade_history_item'

export {
    // REST Clients
    // publicREST.Request,
    privateRESTRequest,

    // REST Methods
    getTicker,
    getClosedOrders,
    findClosedOrder,
    // getOpenOrders,
    // getPairBalances,

    // Public-WS
    publicWSClient,
    onPublicWSClosed,
    PublicWSHeartbeat$,
    getTickerStream,

    // Private-WS
    gethWsAuthToken,
    privateWSClient,
    onPrivateWSClosed,
    WSPrivateHeartbeat$,
    getOpenOrdersStream,  

    // Types
    // PublicEndpoint,
    // PrivateEndpoint,
    KrakenTradesHistoryItem,
    IPriceTicker,
    IOrderSnapshot,
    OpenOrdersStream,
}
