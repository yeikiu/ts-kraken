import { RESTFeeTierInfo, RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/getTradeVolume */

export type Params = {
    pair?: string; //Comma delimited list of asset pairs to get fee info on (optional)
    'fee-info'?: boolean;
}

export type Response = RESTResponse<Result>

export type Result = {
    currency: string;
    volume: string;
    fees: { [pair: string]: RESTFeeTierInfo };
    fees_maker: { [pair: string]: RESTFeeTierInfo };
}
