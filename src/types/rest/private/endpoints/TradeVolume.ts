/* https://docs.kraken.com/rest/#operation/getTradeVolume */

type RestFeeTierInfo = {
    fee: string;
    minfee: string;
    maxfee: string;
    nextfee: string;
    nextvolume: string;
    tiervolume: string;
};

export type Endpoint = 'TradeVolume';

export type Params = {
    pair?: string; //Comma delimited list of asset pairs to get fee info on (optional)
    'fee-info'?: boolean;
}

export type Result = {
    currency: string;
    volume: string;
    fees: { [pair: string]: RestFeeTierInfo };
    fees_maker: { [pair: string]: RestFeeTierInfo };
}
