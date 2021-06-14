import { AssetPairs } from './endpoints/AssetPairs'
import { Assets } from './endpoints/Assets'
import { Depth } from './endpoints/Depth'
import { OHLC } from './endpoints/OHLC'
import { Spread } from './endpoints/Spread'
import { SystemStatus } from './endpoints/SystemStatus'
import { Ticker } from './endpoints/Ticker'
import { Time } from './endpoints/Time'
import { Trades } from './endpoints/Trades'

export { 
    AssetPairs, Assets,
    Depth, OHLC,
    Spread, SystemStatus,
    Ticker, Time,
}
export namespace PublicREST {
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
}
