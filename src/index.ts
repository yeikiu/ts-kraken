import { config } from 'dotenv'
config()

/* PUBLIC WS */
export { getPublicSubscription, onPublicWSClosed, WSPublicHeartbeat$ } from './ws/public/public_ws_client'

/* PUBLIC WS HELPERS */
export { getSpreadStream, getTickerStream, getTradesStream, getBookStream, watchPairPrice } from './ws/public/helpers'

/* PRIVATE WS */
export { getPrivateSubscription, onPrivateWSClosed, sendPrivateEvent, WSPrivateHeartbeat$ } from './ws/private/private_ws_client'

/* PRIVATE WS HELPERS */
export { getOpenOrdersStream } from './ws/private/helpers/get_open_orders_stream'

/* PUBLIC REST */
export { publicRESTRequest } from './rest/public/public_rest_request'

/* PUBLIC REST HELPERS */
export { getTicker } from './rest/public/helpers/get_ticker'

/* PRIVATE REST */
export { privateRESTRequest } from './rest/private/private_rest_request'

/* PRIVATE REST HELPERS */
export { getClosedOrders, findClosedOrder, getOpenOrders, getPairBalances, getWsAuthToken } from './rest/private/helpers'

export * from './types'
