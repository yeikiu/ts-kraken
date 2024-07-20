import { privateRestRequest } from '../private_rest_request';
import { ApiCredentials } from '$types/ws/private';

/**
 * Returns an array of prices for two assets in the same order the are passed
 *
 * @param pair - Array of [baseAsset, quoteAsset]
 * @param injectedApiKeys - <OPTIONAL> Pair of keys to use in runtime if no keys are set in your process.env or you want to use multiple keypairs...
 * @returns [baseAssetBalance, quoteAssetBalance]
 *
 * @beta
 */
export const getPairBalances = async ([base, quote]: string[], injectedApiKeys?: ApiCredentials): Promise<string[]> => {
    let rawBalances = await privateRestRequest({ url: 'Balance' }, injectedApiKeys);
    rawBalances = {
        ...rawBalances,
        USD: rawBalances['ZUSD'] || '0',
        EUR: rawBalances['ZEUR'] || '0',
        ETH: rawBalances['XETH'] || '0',
        XBT: rawBalances['XXBT'] || '0',
        BTC: rawBalances['XXBT'] || '0',
        XRP: rawBalances['XXRP'] || '0',
    };
    return [rawBalances[base], rawBalances[quote]];
};
