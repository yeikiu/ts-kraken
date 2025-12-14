import { stringify } from 'qs';
import { isBrowser } from '../../../util/is_browser';
import { getMessageSignatureBrowser } from './message_signature_browser';

interface GetMessageSignatureParams { path: string, payload: unknown, nonce: number, apiSecret: string }

/**
 * Node.js implementation using crypto module
 */
const getMessageSignatureNode = async ({ path, payload, nonce, apiSecret }: GetMessageSignatureParams): Promise<string> => {
    // Dynamic import to avoid bundling Node.js crypto in browser builds
    const { createHash, createHmac } = await import('crypto');

    const message = stringify(payload);
    const secretBuffer = Buffer.from(apiSecret, 'base64');
    const hash = createHash('sha256');
    const hmac = createHmac('sha512', secretBuffer);
    const hashDigest = Buffer.from(hash.update(nonce + message).digest()).toString('latin1');
    const hmacDigest = hmac.update(path + hashDigest, 'latin1').digest('base64');

    return hmacDigest;
};

/**
 * Universal message signature generator
 * Automatically detects environment and uses appropriate implementation
 */
export const getMessageSignature = async (params: GetMessageSignatureParams): Promise<string> => {
    if (isBrowser()) {
        return getMessageSignatureBrowser(params);
    } else {
        return getMessageSignatureNode(params);
    }
};
