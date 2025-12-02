import axios, { AxiosInstance } from 'axios';
import { getBaseURL, krakenAxiosBrowserConfig, krakenAxiosNodeConfig } from '../axios_config';
import { PublicRestEndpoint } from '../../../types/rest/public';
import { PublicRestTypes } from '../../..';
import { isBrowser } from '../../../util/is_browser';

// Lazy initialization to evaluate baseURL at runtime
let publicRestClient: AxiosInstance | null = null;
const getPublicRestClient = (): AxiosInstance => {
    const krakenAxiosConfig = isBrowser() ? krakenAxiosBrowserConfig : krakenAxiosNodeConfig;
    if (!publicRestClient) {
        publicRestClient = axios.create(krakenAxiosConfig);
        publicRestClient.defaults.baseURL = `${getBaseURL()}/public`;
        publicRestClient.defaults.method = 'GET';
    }
    return publicRestClient;
};

/**
 * Sends a Rest request to a public Endpoint @ `https://api.kraken.com/0/public/<Endpoint>`
 * 
 * @example
 * ```ts
    import { publicRestRequest } from 'ts-kraken';

    publicRestRequest({ url: 'Ticker', params: { pair: 'XBTEUR'}})
        .then(data => {
            const [pairKey] = Object.keys(data);
            console.log({ tickerData: data[pairKey]});
        });
 * ```
 */
export async function publicRestRequest<E extends PublicRestEndpoint>(publicRequest: PublicRestTypes.PublicRestRequest<E>): Promise<PublicRestTypes.PublicRestResult<E>> {
    const { data: { result, error } } = await getPublicRestClient().request<PublicRestTypes.PublicRestResponse<E>>(publicRequest);
    if (error?.length > 0) {
        throw new Error(error?.join(' '));
    }

    return result;
}
