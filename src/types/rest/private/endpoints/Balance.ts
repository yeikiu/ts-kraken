/* https://docs.kraken.com/rest/#operation/getAccountBalance */

export type Endpoint = 'Balance';

export type Result = {
    [asset: string]: string;
}
