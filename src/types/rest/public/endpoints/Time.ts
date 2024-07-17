/* https://docs.kraken.com/rest/#tag/Spot-Market-Data/operation/getServerTime */

export type Endpoint = 'Time';

export type Result = {
    unixtime: number;
    rfc1123: string;
}
