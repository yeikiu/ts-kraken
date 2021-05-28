import * as repl from 'repl'
import { publicRESTRequest } from '../ts-kraken-rest/public_rest_request';
import { parse } from 'qs' /* https://stackoverflow.com/a/9547490 */
import { PrivateEndpoint, PublicEndpoint } from '../types/rest_endpoints';
import { privateRESTRequest } from '../ts-kraken-rest/private_rest_request';
import { publicWSClient } from '../ts-kraken-ws/public_ws_client';
import { Subscription } from 'rxjs';
import { gethWsAuthToken, privateWSClient } from '../ts-kraken-ws/private_ws_client';

let { KRAKEN_API_KEY, KRAKEN_API_SECRET } = process.env
const wsSubscriptions: Map<string, Subscription> = new Map()
const myRepl = repl.start('kraken-repl >> ');

myRepl.defineCommand('setKeys', {
  help: 'Safely set api key/secret in-memory just in the current context',

  action: () => myRepl.question('API-key: ', (key) => {
    KRAKEN_API_KEY = key
    myRepl.question('API-secret: ', (secret) => { KRAKEN_API_SECRET = secret })
  })
})

myRepl.defineCommand('showKeys', {
  help: 'Display current context api key/secret',
  action: () => console.log({ KRAKEN_API_KEY, KRAKEN_API_SECRET })
})

myRepl.defineCommand('get', {
  help: 'endpoint?param1=value1&param_list2[]=value2,value3',

  action: async (paramsStr) => {

    const [endpoint, rawParams = ''] = paramsStr.split('?')
    const params = parse(rawParams)

    const response = await publicRESTRequest({ url: endpoint as PublicEndpoint, params })
    console.log(JSON.stringify({ response }, null, 4))
  }
})

myRepl.defineCommand('post', {
  help: 'endpoint?param1=value1&param_list2[]=value2,value3',

  action: async (paramsStr) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }

    const [endpoint, rawParams = ''] = paramsStr.split('?')
    const params = parse(rawParams)

    const response = await privateRESTRequest({ url: endpoint as PrivateEndpoint, params })
    console.log(JSON.stringify({ response }, null, 4))
  }
})

myRepl.defineCommand('publicSubscription', {
  help: 'subscriptionName?param1=value1&param_list2[]=value2,value3',

  action: async (paramsStr) => {
    const [name, rawParams = ''] = paramsStr.split('?')
    const params = parse(rawParams)
    const subscription = publicWSClient.multiplex(() => ({
      event: 'subscribe',
      subscription: {
        name
      },
      ...params
    }), () => ({
      event: 'unsubscribe',
      subscription: {
        name
      },
      ...params
    }), (response): boolean => Array.isArray(response) && response.some(v => v === name))
      .subscribe(payload => console.log(JSON.stringify({ payload }, null, 4)))

    console.log(`Subscribing to ${name} stream...`)
    wsSubscriptions.set(name, subscription)
  }
})

myRepl.defineCommand('privateSubscription', {
  help: 'subscriptionName?param1=value1&param_list2[]=value2,value3',

  action: async (paramsStr) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const token = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })

    const [name, rawParams = ''] = paramsStr.split('?')
    const params = parse(rawParams)
    const subscription = privateWSClient.multiplex(() => ({
      event: 'subscribe',
      subscription: {
        name,
        token
      },
      ...params
    }), () => ({
      event: 'unsubscribe',
      subscription: {
        name,
        token
      },
      ...params
    }), (response): boolean => Array.isArray(response) && response.some(v => v === name))
      .subscribe(payload => console.log(JSON.stringify({ payload }, null, 4)))

    console.log(`Subscribing to ${name} stream...`)
    wsSubscriptions.set(name, subscription)
  }
})

myRepl.defineCommand('closeSubscription', {
  help: 'closes all open public WebSocket streams',

  action: async (subscriptionName) => {
    wsSubscriptions.get(subscriptionName)?.unsubscribe()
    if (wsSubscriptions.delete(subscriptionName)) {
      console.log(`${subscriptionName} unsubscribed!`)
    }
  }
})

myRepl.defineCommand('closeAllSubscriptions', {
  help: 'closes all open public WebSocket streams',

  action: async () => {
    Array.from(wsSubscriptions).forEach(([subscriptionName, sub]) => {
      sub.unsubscribe()
      if (wsSubscriptions.delete(subscriptionName)) {
        console.log(`${subscriptionName} unsubscribed!`)
      }
    })
  }
})
