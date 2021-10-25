// import type { BinaryData } from 'fs'
import type { RESTResponse } from '../../responses_rest'

/* https://docs.kraken.com/rest/#operation/retrieveExport */

export type Params = {
    id: string;
}

export type Response = RESTResponse<Result>

export type Result = BinaryData;
