import { Assets } from './endpoints/Assets'
import { SystemStatus } from './endpoints/SystemStatus'
import { Ticker } from './endpoints/Ticker'
import { Time } from './endpoints/Time'

export { Assets, SystemStatus, Ticker, Time }
export namespace PublicREST {
    export type Endpoint =
        'Time' | 'SystemStatus' | 'Assets' | 'AssetPairs' | 'Ticker' |
        'Depth' | 'Trades' | 'Spread' | 'OHLC'

    export type Params = Time.Params | SystemStatus.Params | Ticker.Params | Assets.Params
    export type Response = Time.Response | SystemStatus.Response | Ticker.Response | Assets.Response
    export type Result = Time.Result | SystemStatus.Result | Ticker.Result | Assets.Result

    export type Request = {
        url: Endpoint;
        method?: 'GET' | 'get';
        params?: Params;
    }
}
