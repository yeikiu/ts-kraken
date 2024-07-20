import { RestResponse } from '..';
import { AssetPairs, Assets, Depth, OHLC, Spread, SystemStatus, Ticker, Time, Trades } from './endpoints';

export type ValidOhlcInterval = 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 |  21600;

export type Endpoint = 
    AssetPairs.Endpoint | 
    Assets.Endpoint |
    Depth.Endpoint | 
    OHLC.Endpoint |
    Spread.Endpoint |
    SystemStatus.Endpoint |
    Ticker.Endpoint | 
    Time.Endpoint |
    Trades.Endpoint;

export type Params<T extends Endpoint> =
    T extends AssetPairs.Endpoint ? AssetPairs.Params :
    T extends Assets.Endpoint ? Assets.Params :
    T extends Depth.Endpoint ? Depth.Params :
    T extends OHLC.Endpoint ? OHLC.Params :
    T extends Spread.Endpoint ? Spread.Params :
    T extends Ticker.Endpoint ? Ticker.Params :
    T extends Trades.Endpoint ? Trades.Params : never;

export type Request<T extends Endpoint> = {
    url: T;
    method?: 'GET' | 'get';
    params?: Params<T>;
}

export type Result<T extends Endpoint> =
    T extends AssetPairs.Endpoint ? AssetPairs.Result : 
    T extends Assets.Endpoint ? Assets.Result :
    T extends Depth.Endpoint ? Depth.Result :
    T extends OHLC.Endpoint ? OHLC.Result :
    T extends Spread.Endpoint ? Spread.Result :
    T extends SystemStatus.Endpoint ? SystemStatus.Result :
    T extends Ticker.Endpoint ? Ticker.Result :
    T extends Time.Endpoint ? Time.Result :
    T extends Trades.Endpoint ? Trades.Result : never;

export type Response<T extends Endpoint> = RestResponse<Result<T>>;
