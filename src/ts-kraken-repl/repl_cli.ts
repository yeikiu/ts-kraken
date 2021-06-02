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
import { WebSocketSubject } from 'rxjs/webSocket';

let { KRAKEN_API_KEY, KRAKEN_API_SECRET } = process.env
const wsSubscriptions: Map<string, Subscription> = new Map()
const cmdRegExp = /\s*?(\w+)(?:\s+?(&?\S+=\S+)+)?(?:\s+(.+))?/

// TODO: extract to util imports
const print = (content: unknown, asTable = false) => asTable ? console.table(content) : console.log(content)

// TODO: extract to util imports
const subscriptionHandler = (wsClient: WebSocketSubject<unknown>, subscriptionName: string, params: any, jqFilter: string, asTable?: boolean, token?: string) => wsClient.multiplex(() => ({
  event: 'subscribe',
  subscription: {
    name: subscriptionName,
    ...token ? { token } : {}
  },
  ...params
}), () => ({
  event: 'unsubscribe',
  subscription: {
    name: subscriptionName,
    ...token ? { token } : {}
  },
  ...params
}), (response): boolean => Array.isArray(response) && response.some(v => v === subscriptionName)
).subscribe(async payload => {
  if (jqFilter) {
    const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' })
    return print(jqPayload, asTable)
  }
  print(payload, asTable)
}, async (subscriptionError) => {
  console.error({ subscriptionError })
  wsSubscriptions.get(subscriptionName)?.unsubscribe()
  if (wsSubscriptions.delete(subscriptionName)) {
    print(`${subscriptionName} unsubscribed! Re-attempting subscription in 5 seconds...`)
  }
  const freshToken = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET }) 
  setTimeout(() => {
    const reSubscription = subscriptionHandler(wsClient, subscriptionName, params, jqFilter, asTable, freshToken)
    wsSubscriptions.set(subscriptionName, reSubscription)
  }, 5000)
})

print(printKrakenHeader())
const myRepl = repl.start('kraken-repl >> ');

// Delete and rename some core methods
const coreMethods = Object.keys(myRepl.commands)
const editedCoreMethods = coreMethods.reduce((p, c) => ({
  ...p,
  [c]: { 
    ...myRepl.commands[c],
    help: `👉 ${myRepl.commands[c].help}\n---`
  }
}), {})
Object.assign(myRepl.commands, editedCoreMethods)

// Custom commands
myRepl.defineCommand('setKeys', {
  help: `👉 Safely set api key/secret in-memory just in the current context
---`,

  action: () => myRepl.question('API-key: ', (key) => {
    KRAKEN_API_KEY = key
    myRepl.question('API-secret: ', (secret) => { KRAKEN_API_SECRET = secret })
  })
})

myRepl.defineCommand('showKeys', {
  help: `👉 Display current api key/secret
---`,
  action: () => print({ KRAKEN_API_KEY, KRAKEN_API_SECRET })
})

myRepl.defineCommand('get', {
  help: `👉 Fetch PUBLIC REST data. Usage >> PublicEndpoint paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

          i.e. >> .get Time .rfc1123
               >> .get AssetPairs . as $base|keys|map($base[.])|map({pair:.wsname,decimals:.pair_decimals,min:.ordermin}) -table
---`,

  action: async (cmdArgs: string) => {
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, endpoint, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    print({ endpoint, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    try {
      const response = await publicRESTRequest({ url: endpoint as PublicEndpoint, params })
      if (jqFilter) {
        const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' })
        return print(jqResponse, asTable)
      }
      print(response, asTable)

    } catch (publicRESTerror) {
      console.error({ publicRESTerror })
    }
  }
})

myRepl.defineCommand('post', {
  help: `👉 Fetch PRIVATE REST data. Usage >> PrivateEndpoint paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

          i.e. >> .post OpenOrders
               >> .post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table
---`,
  action: async (cmdArgs: string) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, endpoint, rawData, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const data = parse(rawData)
    print({ endpoint, data, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    try {
      const response = await privateRESTRequest({ url: endpoint as PrivateEndpoint, data }, { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })
      if (jqFilter) {
        const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' })
        return print(jqResponse, asTable)
      }
      print(response, asTable)

    } catch (privateRESTerror) {
      console.error({ privateRESTerror })
    }
  }
})

myRepl.defineCommand('pubSub', {
  help: `👉 Subscribe to PUBLIC WS stream. Usage >> subscriptionName paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

          i.e. >> .pubSub ticker pair[]=XBT/USD .[1].c[0]
               >> .pubSub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|{pair:.[3],price:$base[1].p[0]}
---`,

  action: async (cmdArgs: string) => {
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, subscriptionName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    print({ subscriptionName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PUBLIC ${subscriptionName} stream...`)
    const subscription = subscriptionHandler(publicWSClient, subscriptionName, params, jqFilter, asTable)
    wsSubscriptions.set(subscriptionName, subscription)
  }
})

myRepl.defineCommand('privSub', {
  help: `👉 Subscribe to PRIVATE WS stream. Usage >> subscriptionName paramA=valueA&param_list[]=value1&param_list[]=value2 jqFilterExpr

          i.e. >> .privSub openOrders .[0]|map(. as $order|keys[0]|$order[.])
---`,

  action: async (cmdArgs: string) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, subscriptionName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    print({ subscriptionName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PRIVATE ${subscriptionName} stream...`)
    const token = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })
    const subscription = subscriptionHandler(privateWSClient, subscriptionName, params, jqFilter, asTable, token)
    wsSubscriptions.set(subscriptionName, subscription)
  }
})

myRepl.defineCommand('unSub', {
  help: `👉 Closes WebSocket stream for GIVEN subscriptionName.

          i.e. >> .unSub ticker
               >> .unSub openOrders
---`,

  action: async (subscriptionName) => {
    wsSubscriptions.get(subscriptionName)?.unsubscribe()
    if (wsSubscriptions.delete(subscriptionName)) {
      print(`${subscriptionName} unsubscribed!`)
    }
  }
})

myRepl.defineCommand('unSubAll', {
  help: `👉 Closes WebSocket stream for ALL subscriptions.

          i.e. >> .unSubAll
---`,

  action: async () => {
    Array.from(wsSubscriptions).forEach(([subscriptionName, sub]) => {
      sub.unsubscribe()
      if (wsSubscriptions.delete(subscriptionName)) {
        print(`${subscriptionName} unsubscribed!`)
      }
    })
  }
})

myRepl.write('.help\n')
myRepl.write('.get Time .rfc1123')
setTimeout(() => print('\nPress enter to start...'), 10)
