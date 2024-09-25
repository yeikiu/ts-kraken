
import { ApiCredentials } from '../../../../types/rest/private';
import { privateRestRequest } from '../private_rest_request';

/**
 * Returns a token string required for WebsocketV2 usage. Helper method for: {@link https://docs.kraken.com/api/docs/rest-api/get-websockets-token | Get Websockets Token}
 * 
 * @example
 * ```ts
    import { getWsAuthToken, privateWsSubscription } from 'ts-kraken';

    getWsAuthToken().then(async token => {
        console.log({ token })

        const balances$ = await privateWsSubscription({
            channel: 'balances',
            params: { snapshot: true }
        }, token) // Pass token here to save time as the library won't need to fetch one internally!

        balances$.subscribe(({data}) => {
            console.table(data)
        })

    }).catch(error => {
        console.log({ error })
    });
 * ```
 * @remarks
 * You don't need to generate this token to use any method from {@link PrivateWs} as they will automatically inject one _on-the-fly_ for you.
 */
export const getWsAuthToken = async (injectedApiKeys?: ApiCredentials): Promise<string> => {
    const { token } = await privateRestRequest({ url: 'GetWebSocketsToken' }, injectedApiKeys) || {};
    if (!token) {
        throw ({ code: 'CUSTOM_ERROR', message: 'no token received' });
    }

    return token;
};
