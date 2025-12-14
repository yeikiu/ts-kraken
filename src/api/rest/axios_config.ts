import { AxiosRequestConfig } from 'axios';
import { isBrowser } from '../../util/is_browser';

export const apiVersion = '0';

// Use proxy in browser environments, direct API in Node.js
export const getBaseURL = () => {
    if (isBrowser()) {
        // Browser environment - use Vite proxy
        return '/api/kraken';
    }
    // Node.js environment - direct to Kraken API
    return `https://api.kraken.com/${apiVersion}`;
};

export const krakenAxiosNodeConfig: AxiosRequestConfig = {
    timeout: 30000,
    headers: {
        // Use custom UA in Node.js
        'User-Agent': 'ts-kraken',
        'content-type': 'application/x-www-form-urlencoded'
    }
    // Note: baseURL is not set here - it's set at runtime in createPrivateRestClient and publicRestRequest
};

export const krakenAxiosBrowserConfig: AxiosRequestConfig = {
    timeout: 30000,
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
    // Note: baseURL is not set here - it's set at runtime in createPrivateRestClient and publicRestRequest
};
