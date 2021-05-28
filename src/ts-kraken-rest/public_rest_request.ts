import axios, { AxiosInstance } from 'axios'
import { krakenAxiosConfig, PublicAxiosRequest } from './axios_config'

const publicRESTClient: AxiosInstance = axios.create(krakenAxiosConfig)
publicRESTClient.defaults.baseURL = `${publicRESTClient.defaults.baseURL}/public`
publicRESTClient.defaults.method = 'GET'

export const publicRESTRequest = async ({ url, params }: PublicAxiosRequest): Promise<any> => {
    const { data: { result: krakenPublicResponse, error }} = await publicRESTClient.request({ url, params }) || {}
    if (error?.length) {
        const errorStr = error.join(' | ')
        console.error(errorStr)
        throw new Error(errorStr)
    }
    // console.log(JSON.stringify(krakenPublicResponse, null, 4))
    return krakenPublicResponse
}
