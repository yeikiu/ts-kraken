import { AxiosRequestConfig } from 'axios'

export const apiVersion = '0'
export const krakenAxiosConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: {
        'User-Agent': 'ts-kraken-rest',
        'content-type': 'application/x-www-form-urlencoded',
    },
    baseURL: `https://api.kraken.com/${apiVersion}`,
}
