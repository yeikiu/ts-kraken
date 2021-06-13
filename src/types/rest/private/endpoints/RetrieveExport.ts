import { BinaryData } from 'fs'
import { RESTResponse } from '../../api_response'

/* https://docs.kraken.com/rest/#operation/retrieveExport */

export namespace RetrieveExport {
    export type Params = {
        id: string;
    }

    export type Response = RESTResponse<Result>

    export type Result = BinaryData;
}
