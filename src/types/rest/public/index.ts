import { RestResponse } from '..';
import { AssetPairs, Assets, Depth, OHLC, Spread, SystemStatus, Ticker, Time, Trades } from './endpoints';

export * as PublicEndpoints from './endpoints';

export type PublicEndpoint =
    'AssetPairs' |
    'Assets' |
    'Depth' |
    'OHLC' |
    'Spread' |
    'SystemStatus' | // no params
    'Ticker' |
    'Time' | // no params
    'Trades';

export type PublicParams<T extends PublicEndpoint> =
    T extends 'AssetPairs' ? AssetPairs.Params : // all optional
    T extends 'Assets' ? Assets.Params :
    T extends 'Depth' ? Depth.Params :
    T extends 'OHLC' ? OHLC.Params :
    T extends 'Spread' ? Spread.Params :
    T extends 'Ticker' ? Ticker.Params : // all optional
    T extends 'Trades' ? Trades.Params : never;

export type PublicRequest<T extends PublicEndpoint> = 
    T extends 'SystemStatus' ? { // no params
        url: T;
        params?: never;
    } :
    T extends 'Time' ? { // no params
        url: T;
        params?: never;
    } :
    T extends 'AssetPairs' ? { // all optional
        url: T;
        params?: PublicParams<T>;
    } :
    T extends 'Ticker' ? { // all optional
        url: T;
        params?: PublicParams<T>;
    } : { // Mandatory params
        url: T;
        params: PublicParams<T>;
    }

export type PublicResult<T extends PublicEndpoint> =
    T extends 'AssetPairs' ? AssetPairs.Result :
    T extends 'Assets' ? Assets.Result :
    T extends 'Depth' ? Depth.Result :
    T extends 'OHLC' ? OHLC.Result :
    T extends 'Spread' ? Spread.Result :
    T extends 'SystemStatus' ? SystemStatus.Result :
    T extends 'Ticker' ? Ticker.Result :
    T extends 'Time' ? Time.Result :
    T extends 'Trades' ? Trades.Result : never;

export type PublicResponse<T extends PublicEndpoint> = RestResponse<PublicResult<T>>;
