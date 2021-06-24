import type { AssetPairs, Assets, Depth, OHLC, Spread, Ticker, Trades, SystemStatus, Time } from './endpoints';

export * as Endpoints from './endpoints'

export type Endpoint =
    'AssetPairs' | 'Assets' |
    'Depth' | 'OHLC' |
    'Spread' | 'SystemStatus' |
    'Ticker' | 'Time' | 'Trades';

export type Params =
    AssetPairs.Params | Assets.Params |
    Depth.Params | OHLC.Params |
    Spread.Params |
    Ticker.Params | Trades.Params;

export type Response = 
    AssetPairs.Response | Assets.Response |
    Depth.Response | OHLC.Response |
    Spread.Response | SystemStatus.Response |
    Ticker.Response | Time.Response | Trades.Response;
    

export type Result =
    AssetPairs.Result |  Assets.Result |
    Depth.Result | OHLC.Result |
    Spread.Result | SystemStatus.Result |
    Ticker.Result | Time.Result | Trades.Result; 

export type Request = {
    url: Endpoint;
    method?: 'GET' | 'get';
    params?: Params;
}
