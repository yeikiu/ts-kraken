import { ApiResponse } from '../../api_response'
import { IOrderSnapshot } from '../../../order_snapshot'

export namespace OpenOrders {
    export type Params = {
        trades?: boolean;
        userref?: number;
    }
    
    export type Response = ApiResponse<Result>

    export type Result = {
        open: {
            [k: string]:
                Omit<IOrderSnapshot, 'orderid'> &
                Omit<IOrderSnapshot, 'avg_price'> &
                Omit<IOrderSnapshot, 'cancel_reason'>
        }
    }
}
