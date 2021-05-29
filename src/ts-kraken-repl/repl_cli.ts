import * as repl from 'repl'
import { publicRESTRequest } from '../ts-kraken-rest/public_rest_request';
import { parse } from 'qs' /* https://stackoverflow.com/a/9547490 */
import { PrivateEndpoint, PublicEndpoint } from '../types/rest_endpoints';
import { privateRESTRequest } from '../ts-kraken-rest/private_rest_request';
import { publicWSClient } from '../ts-kraken-ws/public_ws_client';
import { Subscription } from 'rxjs';
import { gethWsAuthToken, privateWSClient } from '../ts-kraken-ws/private_ws_client';
import printKrakenHeader from './print_kraken_header'
import { run } from 'node-jq'

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
  help: `
      - Fetch PUBLIC REST data. Usage >> PublicEndpoint?paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

        i.e --> .get Time | rfc1123
  `,

  action: async (paramsStr) => {
    const [rawEndpoint, jqFilter] = paramsStr.split(' ')
    const [endpoint, rawParams] = rawEndpoint.split('?')
    const params = parse(rawParams)
    console.log({ endpoint, params, jqFilter })

    try {
      const response = await publicRESTRequest({ url: endpoint as PublicEndpoint, params })
      if (jqFilter) {
        const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' })
        return console.log({ jqResponse })
      }
      console.log({ response })

    } catch (publicRESTerror) {
      console.error({ publicRESTerror })
    }
  }
})

myRepl.defineCommand('post', {
  help: `
      - Fetch PRIVATE REST data. Usage >> PrivateEndpoint?paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

        i.e --> .post ClosedOrders?trades=true
  `,
  action: async (paramsStr) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const [rawEndpoint, jqFilter] = paramsStr.split(' ')
    const [endpoint, rawParams] = rawEndpoint.split('?')
    const params = parse(rawParams)
    console.log({ endpoint, params, jqFilter })

    try {
      const response = await privateRESTRequest({ url: endpoint as PrivateEndpoint, params })
      if (jqFilter) {
        const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' })
        return console.log({ jqResponse })
      }
      console.log({ response })

    } catch (privateRESTerror) {
      console.error({ privateRESTerror })
    }
  }
})

myRepl.defineCommand('publicSubscription', {
  help: 'subscriptionName?paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr',

  action: async (paramsStr) => {
    const [rawSubscription, jqFilter] = paramsStr.split(' ')
    const [name, rawParams] = rawSubscription.split('?')
    const params = parse(rawParams)
    console.log({ subscription: name, params, jqFilter })

    const subscription = publicWSClient.multiplex(() => ({
      event: 'subscribe',
      subscription: {
        name,
      },
      ...params
    }), () => ({
      event: 'unsubscribe',
      subscription: {
        name
      },
      ...params
    }), (response): boolean => Array.isArray(response) && response.some(v => v === name))
      .subscribe(async payload => {
        if (jqFilter) {
          const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' })
          return console.log({ jqPayload })
        }
        console.log({ payload })
      })

    console.log(`Subscribing to ${name} stream...`)
    wsSubscriptions.set(name, subscription)
  }
})

myRepl.defineCommand('privateSubscription', {
  help: 'subscriptionName?paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr',

  action: async (paramsStr) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const token = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })

    const [rawSubscription, jqFilter] = paramsStr.split(' ')
    const [name, rawParams] = rawSubscription.split('?')
    const params = parse(rawParams)
    console.log({ subscription: name, params, jqFilter })

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
      .subscribe(async payload => {
        if (jqFilter) {
          const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' })
          return console.log({ jqPayload })
        }
        console.log({ payload })
      })

    console.log(`Subscribing to ${name} stream...`)
    wsSubscriptions.set(name, subscription)
  }
})

myRepl.defineCommand('closeSubscription', {
  help: 'closes WebSocket stream for given subscriptionName',

  action: async (subscriptionName) => {
    wsSubscriptions.get(subscriptionName)?.unsubscribe()
    if (wsSubscriptions.delete(subscriptionName)) {
      console.log(`${subscriptionName} unsubscribed!`)
    }
  }
})

myRepl.defineCommand('closeAllSubscriptions', {
  help: 'closes all open WebSocket streams',

  action: async () => {
    Array.from(wsSubscriptions).forEach(([subscriptionName, sub]) => {
      sub.unsubscribe()
      if (wsSubscriptions.delete(subscriptionName)) {
        console.log(`${subscriptionName} unsubscribed!`)
      }
    })
  }
})

console.log(printKrakenHeader())
setTimeout(() => myRepl.write('.help\n'), 500)
setTimeout(() => myRepl.write('.get Time .rfc1123'), 750)
setTimeout(() => console.log('\n\nPress enter to start...'), 1000)
