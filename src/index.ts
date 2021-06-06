import { findClosedOrder, getClosedOrders } from './ts-kraken-rest/private_requests/get_closed_orders'
import { getOpenOrders } from './ts-kraken-rest/private_requests/get_open_orders'
import { getPairBalances } from './ts-kraken-rest/private_requests/get_pair_balances'
import { privateRESTRequest } from './ts-kraken-rest/private_rest_request'
import { getTickerInfo } from './ts-kraken-rest/public_requests/get_ticker_info'
import { publicRESTRequest } from './ts-kraken-rest/public_rest_request'
import { getOpenOrdersStream, OpenOrdersStream } from './ts-kraken-ws/private_events/get_open_orders_stream'
import { gethWsAuthToken, onPrivateWSClosed, privateWSClient, WSPrivateHeartbeat$ } from './ts-kraken-ws/private_ws_client'
import { getPriceTickerStream } from './ts-kraken-ws/public_events/get_price_ticker_stream'
import { onPublicWSClosed, publicWSClient, WSPublicHeartbeat$ } from './ts-kraken-ws/public_ws_client'
import { subscriptionHandler } from './ts-kraken-ws/subscription_handler'
import { InjectedApiKeys } from './types/injected_api_keys'
import { OrderSnapshot } from './types/order_snapshot'
import { PriceTicker } from './types/price_ticker'
import { PublicEndpoint, PrivateEndpoint } from './types/rest_endpoints'
import { KrakenTradesHistoryItem } from './types/trade_history_item'
import { PublicSubscription, PrivateSubscription, ValidInterval, ValidDepth } from './types/ws_subscriptions'

export {
    // REST Clients
    publicRESTRequest,
    privateRESTRequest,

    // REST Methods
    getTickerInfo,
    getClosedOrders,
    findClosedOrder,
    getOpenOrders,
    getPairBalances,

    // WS
    subscriptionHandler,

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
    PublicEndpoint,
    PrivateEndpoint,
    KrakenTradesHistoryItem,
    PriceTicker,
    OrderSnapshot,
    InjectedApiKeys,
    PublicSubscription,
    PrivateSubscription,
    ValidInterval,
    ValidDepth,
    OpenOrdersStream,
}
