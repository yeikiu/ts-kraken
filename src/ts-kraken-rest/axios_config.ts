import { AxiosRequestConfig } from 'axios'
import { PrivateEndpoint, PublicEndpoint } from '../types/rest_endpoints'

export interface PublicAxiosRequest extends AxiosRequestConfig {
    url: PublicEndpoint;
}

export interface PrivateAxiosRequest extends AxiosRequestConfig {
    url: PrivateEndpoint;
}

export const apiVersion = '0'
export const krakenAxiosConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: {
        'User-Agent': 'ts-kraken-rest',
        'content-type': 'application/x-www-form-urlencoded',
    },
    baseURL: `https://api.kraken.com/${apiVersion}`,
    method: 'POST',
}
