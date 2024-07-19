/* https://docs.kraken.com/rest/#operation/removeExport */

export type Endpoint = 'RemoveExport';

export type DeleteParams = {
    id: string;
    type: 'delete';
};
export type CancelParams = {
    id: string;
    type: 'cancel';
};

export type Params = DeleteParams | CancelParams;

export type DeleteResult = { delete: boolean };
export type CancelResult = { cancel: boolean };

export type Result<T extends Params> = 
    T extends DeleteParams ? DeleteResult :
    T extends CancelParams ? CancelResult : never;
