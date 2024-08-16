import { config } from 'dotenv';

const { parsed, error: loadConfigError } = config();

if (loadConfigError) {
    console.error({ loadConfigError });
} else {
    globalThis.env = {...parsed};
}

/* Root named exports */
export * from './api';
export * from './types';

/* Cherry-picked exports for most common methods */
export { publicRestRequest, PublicRestHelpers } from './api/rest/public';
export { privateRestRequest, PrivateRestHelpers } from './api/rest/private';

export { publicWsSubscription, publicWsRequest } from './api/ws/public/public_ws_client';
export { privateWsSubscription, privateWsRequest } from './api/ws/private/private_ws_client';

export { getTickersPrices } from './api/rest/public/helpers/get_tickers_prices';
export { getOpenOrders, getClosedOrders, findClosedOrder, getWsAuthToken } from './api/rest/private/helpers';
