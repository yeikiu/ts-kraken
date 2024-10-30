import { config } from 'dotenv';

const { parsed, error: loadConfigError } = config();

if (loadConfigError) {
    console.error({ loadConfigError });
} else {
    globalThis.env = {...parsed};
}

/* Types exports */
export type { PublicRestTypes, PrivateRestTypes, PublicWsTypes, PrivateWsTypes } from './types';

/* Cherry-picked exports for consumer methods */
export { publicRestRequest } from './api/rest/public';
export { privateRestRequest } from './api/rest/private';

export { publicWsSubscription, publicWsRequest } from './api/ws/public/public_ws_client';
export { privateWsSubscription, privateWsRequest } from './api/ws/private/private_ws_client';

export { getTickersPrices } from './api/rest/public/helpers/get_tickers_prices';
export { getOpenOrders, getClosedOrders, findClosedOrder, getWsAuthToken } from './api/rest/private/helpers';
