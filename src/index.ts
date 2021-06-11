import { findClosedOrder, getClosedOrders } from './rest/private/helpers/get_closed_orders'
import { privateRESTRequest } from './rest/private/private_rest_request'
import { getTickerInfo } from './rest/public/helpers/get_ticker_info'
import { getOpenOrdersStream, OpenOrdersStream } from './ws/private/helpers/get_open_orders_stream'
import { gethWsAuthToken, onPrivateWSClosed, privateWSClient, WSPrivateHeartbeat$ } from './ws/private/private_ws_client'
import { getPriceTickerStream } from './ws/public/helpers/get_price_ticker_stream'
import { onPublicWSClosed, publicWSClient, WSPublicHeartbeat$ } from './ws/public/public_ws_client'
import { IOrderSnapshot } from './types/order_snapshot'
import { PriceTicker } from './types/price_ticker'
import { KrakenTradesHistoryItem } from './types/trade_history_item'

export {
    // REST Clients
    // publicREST.Request,
    privateRESTRequest,

    // REST Methods
    getTickerInfo,
    getClosedOrders,
    findClosedOrder,
    // getOpenOrders,
    // getPairBalances,

    // Public-WS
    publicWSClient,
    onPublicWSClosed,
    WSPublicHeartbeat$,
    getPriceTickerStream,

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
    PriceTicker,
    IOrderSnapshot,
    OpenOrdersStream,
}
