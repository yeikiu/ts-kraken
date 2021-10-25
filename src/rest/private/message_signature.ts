import { stringify } from 'qs'
import { createHash, createHmac } from 'crypto'

// Create a signature for a request
type GetMessageSignatureParams = { path: string; payload: unknown; nonce: number; apiSecret: string; }

export const getMessageSignature = ({ path, payload, nonce, apiSecret }: GetMessageSignatureParams): string => {
  const message = stringify(payload)
  const secretBuffer = Buffer.from(apiSecret, 'base64')
  const hash = createHash('sha256')
  const hmac = createHmac('sha512', secretBuffer)
  const hashDigest = hash.update(nonce + message).digest('base64')
  const hmacDigest = hmac.update(path + hashDigest, 'base64').digest('base64')

  return hmacDigest
}
