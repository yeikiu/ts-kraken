import { PrivateREST } from '../../../types/rest/private'
import { privateRESTRequest } from '../private_rest_request'

/**
 * Returns an array of prices for two assets in the same order the are passed
 *
 * @param pair - Array of [baseAsset, quoteAsset]
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns [baseAssetBalance, quoteAssetBalance]
 *
 * @beta
 */
export const getPairBalances = async ([base, quote]: string[], injectedApiKeys?: PrivateREST.RuntimeApiKeys): Promise<string[]> => {
    let rawBalances = await privateRESTRequest({ url: 'Balance' }, injectedApiKeys)
    rawBalances = {
        ...rawBalances,
        'USD': rawBalances['ZUSD'] || '0',
        'EUR': rawBalances['ZEUR'] || '0',
        'ETH': rawBalances['XETH'] || '0',
    }
    
    return [rawBalances[base], rawBalances[quote]]
}
