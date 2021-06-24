import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/removeExport */

export type DeleteParams = {
    id: string;
    type: 'delete';
};
export type CancelParams = {
    id: string;
    type: 'cancel';
};

export type Params = DeleteParams | CancelParams;

export type Response = RESTResponse<Result>

export type DeleteResult = { delete: boolean };
export type CancelResult = { cancel: boolean };

export type Result = DeleteResult | CancelResult;
