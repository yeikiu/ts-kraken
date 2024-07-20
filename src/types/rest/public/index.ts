import { RestResponse } from '..';
import { AssetPairs, Assets, Depth, Ohlc, Spread, SystemStatus, Ticker, Time, Trades } from './endpoints';

export * as PublicEndpoints from './endpoints';

export type PublicEndpoint = 
    AssetPairs.Endpoint | 
    Assets.Endpoint |
    Depth.Endpoint | 
    Ohlc.Endpoint |
    Spread.Endpoint |
    SystemStatus.Endpoint |
    Ticker.Endpoint | 
    Time.Endpoint |
    Trades.Endpoint;

export type PublicParams<T extends PublicEndpoint> =
    T extends AssetPairs.Endpoint ? AssetPairs.Params :
    T extends Assets.Endpoint ? Assets.Params :
    T extends Depth.Endpoint ? Depth.Params :
    T extends Ohlc.Endpoint ? Ohlc.Params :
    T extends Spread.Endpoint ? Spread.Params :
    T extends Ticker.Endpoint ? Ticker.Params :
    T extends Trades.Endpoint ? Trades.Params : never;

export type PublicRequest<T extends PublicEndpoint> = {
    url: T;
    method?: 'GET' | 'get';
    params?: PublicParams<T>;
}

export type PublicResult<T extends PublicEndpoint> =
    T extends AssetPairs.Endpoint ? AssetPairs.Result : 
    T extends Assets.Endpoint ? Assets.Result :
    T extends Depth.Endpoint ? Depth.Result :
    T extends Ohlc.Endpoint ? Ohlc.Result :
    T extends Spread.Endpoint ? Spread.Result :
    T extends SystemStatus.Endpoint ? SystemStatus.Result :
    T extends Ticker.Endpoint ? Ticker.Result :
    T extends Time.Endpoint ? Time.Result :
    T extends Trades.Endpoint ? Trades.Result : never;

export type PublicResponse<T extends PublicEndpoint> = RestResponse<PublicResult<T>>;
