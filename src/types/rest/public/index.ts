import { Assets } from './endpoints/Assets'
import { OHLC } from './endpoints/OHLC'
import { SystemStatus } from './endpoints/SystemStatus'
import { Ticker } from './endpoints/Ticker'
import { Time } from './endpoints/Time'

export { Assets, SystemStatus, Ticker, Time, OHLC }
export namespace PublicREST {
    export type Endpoint =
        'Time' | 'SystemStatus' | 'Assets' | 'AssetPairs' | 'Ticker' |
        'Depth' | 'Trades' | 'Spread' | 'OHLC'

    export type Params = Ticker.Params | Assets.Params
    
    export type Request = {
        url: Endpoint;
        method?: 'GET' | 'get';
        params?: Params;
    }

    export type Response = Time.Response | SystemStatus.Response | Ticker.Response | Assets.Response | OHLC.Response;
    
    export type Result = Time.Result | SystemStatus.Result | Ticker.Result | Assets.Result | OHLC.Result;
}
