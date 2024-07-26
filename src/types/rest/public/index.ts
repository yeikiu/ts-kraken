import { RestResponse } from '..';
import { AssetPairs, Assets, Depth, OHLC, Spread, SystemStatus, Ticker, Time, Trades } from './endpoints';

export * as PublicRestEndpoints from './endpoints';

export type PublicRestEndpoint =
    'AssetPairs' |
    'Assets' |
    'Depth' |
    'OHLC' |
    'Spread' |
    'SystemStatus' | // no params
    'Ticker' |
    'Time' | // no params
    'Trades';

/**
 * @ignore
 */
export type PublicRestParams<T extends PublicRestEndpoint> =
    T extends 'AssetPairs' ? AssetPairs.Params : // all optional
    T extends 'Assets' ? Assets.Params :
    T extends 'Depth' ? Depth.Params :
    T extends 'OHLC' ? OHLC.Params :
    T extends 'Spread' ? Spread.Params :
    T extends 'Ticker' ? Ticker.Params : // all optional
    T extends 'Trades' ? Trades.Params : never;

/**
 * @ignore
 */
export type PublicRestRequest<T extends PublicRestEndpoint> =
    T extends 'SystemStatus' |
    'Time' ? { // no params
        url: T;
        params?: never;
    } : T extends 'AssetPairs' |
    'Ticker' ? { // all optional
        url: T;
        params?: PublicRestParams<T>;
    } : { // mandatory params
        url: T;
        params: PublicRestParams<T>;
    };

/**
 * @ignore
 */
export type PublicRestResult<T extends PublicRestEndpoint> =
    T extends 'AssetPairs' ? AssetPairs.Result :
    T extends 'Assets' ? Assets.Result :
    T extends 'Depth' ? Depth.Result :
    T extends 'OHLC' ? OHLC.Result :
    T extends 'Spread' ? Spread.Result :
    T extends 'SystemStatus' ? SystemStatus.Result :
    T extends 'Ticker' ? Ticker.Result :
    T extends 'Time' ? Time.Result :
    T extends 'Trades' ? Trades.Result : never;

/**
 * @ignore
 */
export type PublicRestResponse<T extends PublicRestEndpoint> = RestResponse<PublicRestResult<T>>;
