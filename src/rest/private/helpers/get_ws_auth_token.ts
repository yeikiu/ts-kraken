import { privateRESTRequest } from '../../..'

import type { RuntimeApiKeys } from '../../../types'

/**
 * Returns a valid token to use in our WS subscriptions and private requests
 *
 * @param { apiKey, apiSecret } - <OPTIONAL> If not passed, process.env keys will be used to generate a token
 * @returns wsToken string
 */
export const getWsAuthToken = async (injectedApiKeys?: RuntimeApiKeys): Promise<string> => {
  try {
    const { token } = await privateRESTRequest({ url: 'GetWebSocketsToken' }, injectedApiKeys) || {}
    if (!token) {
      throw ({ code: 'CUSTOM_ERROR', message: 'no token received' })
    }
    return token
  } catch ({ code, message }) {
    console.error('Kraken getWsAuthToken error', { code, message })
    throw ({ code, message })
  }
}
