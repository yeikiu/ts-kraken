import { stringify } from 'qs';

interface GetMessageSignatureParams {
  path: string;
  payload: unknown;
  nonce: number;
  apiSecret: string;
}

/**
 * Browser-compatible implementation of message signature generation
 * Uses Web Crypto API instead of Node.js crypto module
 */
export const getMessageSignatureBrowser = async ({
    path,
    payload,
    nonce,
    apiSecret
}: GetMessageSignatureParams): Promise<string> => {
    const message = stringify(payload);
    const encoder = new TextEncoder();

    // SHA256 hash of nonce + message
    const hashBuffer = await crypto.subtle.digest(
        'SHA-256',
        encoder.encode(nonce + message)
    );

    // Decode API secret from base64
    const secretBuffer = Uint8Array.from(atob(apiSecret), c => c.charCodeAt(0));

    // Import secret as HMAC key
    const key = await crypto.subtle.importKey(
        'raw',
        secretBuffer,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
    );

    // Create message: path + hash
    const pathBuffer = encoder.encode(path);
    const messageBuffer = new Uint8Array(pathBuffer.length + hashBuffer.byteLength);
    messageBuffer.set(pathBuffer, 0);
    messageBuffer.set(new Uint8Array(hashBuffer), pathBuffer.length);

    // Sign message with HMAC-SHA512
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, messageBuffer);

    // Convert to base64
    return btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
};
