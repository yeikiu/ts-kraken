import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { krakenAxiosConfig } from './axios_config'
import { PublicEndpoint } from '../types/rest_endpoints'
import debugHelper from '../util/debug_helper'

const { debug, logError } = debugHelper(__filename)

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`

interface PublicRequestConfig extends AxiosRequestConfig {
    method?: 'POST' | 'post';
    url: PublicEndpoint;
    data?: any;
}

export const publicRESTRequest = async ({ url, data }: PublicRequestConfig): Promise<any> => {
    const { data: { result: krakenPublicResponse, error }} = await publicRESTClient.request({ url, data }) || {}
    if (error?.length) {
        const errorStr = error.join(' | ')
        logError(errorStr)
        throw new Error(errorStr)
    }
    debug(JSON.stringify(krakenPublicResponse, null, 4))
    return krakenPublicResponse
}
