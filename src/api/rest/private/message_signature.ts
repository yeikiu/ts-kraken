import { createHash, createHmac } from 'crypto';
import { stringify } from 'qs';

// Create a signature for a request
interface GetMessageSignatureParams { path: string, payload: unknown, nonce: number, apiSecret: string }

export const getMessageSignature = ({ path, payload, nonce, apiSecret }: GetMessageSignatureParams): string => {
    const message = stringify(payload);
    const secretBuffer = Buffer.from(apiSecret, 'base64');
    const hash = createHash('sha256');
    const hmac = createHmac('sha512', secretBuffer);
    const hashDigest = Buffer.from(hash.update(nonce + message).digest()).toString('latin1');
    const hmacDigest = hmac.update(path + hashDigest, 'latin1').digest('base64');

    return hmacDigest;
};
