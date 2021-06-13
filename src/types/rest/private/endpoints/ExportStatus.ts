import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/exportStatus */

export namespace ExportStatus {
    export type Params = {
        report: 'trades' | 'ledgers';
    }

    export type Response = RESTResponse<Result>

    export type Result = unknown[]
}
