import { ApiResponse } from '../../api_response'
import { IOrderSnapshot } from '../../../order_snapshot'

export namespace ClosedOrders {
    export type Params = {
        trades?: boolean;
        userref?: number;
        start?: number;
        end?: number;
        ofs?: number;
        closetime?: 'open' | 'close' | 'both';
    }

    export type Response = ApiResponse<Result>

    export type Result = {
        closed: {
            [k: string]:
                Omit<IOrderSnapshot, 'orderid'> &
                Omit<IOrderSnapshot, 'avg_price'> &
                Omit<IOrderSnapshot, 'cancel_reason'>
        }
    }
}
