import { config } from 'dotenv'
import { getClosedOrders, findClosedOrder } from './rest/private/helpers/get_closed_orders'
import { getOpenOrders } from './rest/private/helpers/get_open_orders'
import { getPairBalances } from './rest/private/helpers/get_pair_balances'
import { gethWsAuthToken } from './rest/private/helpers/get_ws_auth_token'
import { privateRESTRequest } from './rest/private/private_rest_request'
import { getTicker } from './rest/public/helpers/get_ticker'
import { publicRESTRequest } from './rest/public/public_rest_request'
import { getOpenOrdersStream } from './ws/private/helpers/get_open_orders_stream'
import { getPrivateSubscription, onPrivateWSClosed, sendPrivateEvent, WSPrivateHeartbeat$ } from './ws/private/private_ws_client'
import { getSpreadStream } from './ws/public/helpers/get_spread_stream'
import { getTickerStream } from './ws/public/helpers/get_ticker_stream'
import { getTradesStream } from './ws/public/helpers/get_trades_stream'
import { watchPairPrice } from './ws/public/helpers/watch_pair_price'
import { getPublicSubscription, onPublicWSClosed, WSPublicHeartbeat$ } from './ws/public/public_ws_client'

config()

export * from './types'

export {
  /* PUBLIC WS */
  getPublicSubscription,
  onPublicWSClosed,
  WSPublicHeartbeat$,
  /* PUBLIC WS HELPERS */
  getTickerStream,
  getSpreadStream,
  getTradesStream,
  watchPairPrice,

  /* PRIVATE WS */
  getPrivateSubscription,
  sendPrivateEvent,
  onPrivateWSClosed,
  WSPrivateHeartbeat$,
  /* PRIVATE WS HELPERS */
  getOpenOrdersStream,

  /* PUBLIC REST */
  publicRESTRequest,
  /* PUBLIC REST HELPERS */
  getTicker,

  /* PRIVATE REST */
  privateRESTRequest,
  /* PRIVATE REST HELPERS */
  gethWsAuthToken,
  getPairBalances,
  getOpenOrders,
  getClosedOrders,
  findClosedOrder
}
