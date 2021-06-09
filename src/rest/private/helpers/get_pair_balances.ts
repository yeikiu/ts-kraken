import { privateRESTRequest } from '../private_rest_request'

export const getPairBalances = async ([base, quote]: string[]): Promise<string[]> => {
    let rawBalances = await privateRESTRequest({ url: 'Balance' })
    rawBalances = {
        ...rawBalances,
        'USD': rawBalances['ZUSD'] || 0,
        'EUR': rawBalances['ZEUR'] || 0,
        'ETH': rawBalances['XETH'] || 0,
    }
    
    return [rawBalances[base], rawBalances[quote]]
}
