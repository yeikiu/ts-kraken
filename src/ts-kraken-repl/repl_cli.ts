#!/usr/bin/env node
import { config } from 'dotenv'
config()
import repl from 'repl'
import { publicRESTRequest } from '../ts-kraken-rest/public_rest_request';
import { parse } from 'qs' /* https://stackoverflow.com/a/9547490 */
import { PrivateEndpoint, PublicEndpoint } from '../types/rest_endpoints';
import { privateRESTRequest } from '../ts-kraken-rest/private_rest_request';
import { publicWSClient } from '../ts-kraken-ws/public_ws_client';
import { Subscription } from 'rxjs';
import { gethWsAuthToken, privateWSClient } from '../ts-kraken-ws/private_ws_client';
import printKrakenHeader from './print_kraken_header'
import { run } from 'node-jq'
import { SubscriptionHandlerParams, subscriptionHandler } from '../ts-kraken-ws/subscription_handler';
import { PrivateSubscription, PublicSubscription } from '../types/ws_subscriptions';

let { KRAKEN_API_KEY, KRAKEN_API_SECRET } = process.env
const wsSubscriptions: Map<string, Subscription> = new Map()
const cmdRegExp = /\s*?(\S+)(?:\s+?(&?\S+=\S+)+)?(?:\s+(.+))?/

// TODO: extract to util imports
const print = (content: unknown, asTable = false) => asTable ? console.table(content) : console.log(content)

// TODO: extract to util imports
const replSubscriptionHandler = ({ wsClient, name, token, pair, interval, depth }: SubscriptionHandlerParams, jqFilter?: string, asTable?: boolean) => subscriptionHandler({
  wsClient,
  name,
  pair,
  interval,
  depth,
  token
})
.subscribe(async payload => {
  if (jqFilter) {
    const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' })
    // The `.payload|` jq prefix helps with a strange node-jq bug where arrays
    // are printed as text to console by default even with `output: 'json'`
    return print(jqPayload, asTable)
  }
  print(payload, asTable)
}, async (subscriptionError) => {
  console.error({ subscriptionError })
  wsSubscriptions.get(name)?.unsubscribe()
  if (wsSubscriptions.delete(name)) {
    print(`${name} unsubscribed! Re-attempting subscription in 5 seconds...`)
  }
  const freshToken = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET }) 
  setTimeout(() => {
    const reSubscription = replSubscriptionHandler({ wsClient, name, token: freshToken, pair, interval, depth }, jqFilter, asTable)
    wsSubscriptions.set(name, reSubscription)
  }, 5000)
})

print(printKrakenHeader())
const myRepl = repl.start('kraken-repl >> ');

// Modify core methods (bit hacky, these are readonly)
['save', 'load', 'editor', 'clear', 'break', 'exit'].forEach(c => delete (myRepl.commands  as any)[c])
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
  help: `👉 Load API key/secret (non-persistent, use a .env file to reuse persistent keys)
`,

  action: () => myRepl.question('API-key: ', (key) => {
    KRAKEN_API_KEY = key
    myRepl.question('API-secret: ', (secret) => { KRAKEN_API_SECRET = secret })
  })
})

myRepl.defineCommand('showKeys', {
  help: `👉 Display current API key/secret in use
---`,
  action: () => print({ KRAKEN_API_KEY, KRAKEN_API_SECRET })
})

myRepl.defineCommand('get', {
  help: `👉 Fetch PUBLIC REST data. Usage >> .get PublicEndpoint <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

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
  help: `👉 Fetch PRIVATE REST data. Usage >> .post PrivateEndpoint <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

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
  help: `👉 Subscribe to PUBLIC WS stream. Usage >> .pubSub subscriptionName <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

          i.e. >> .pubSub ticker pair[]=XBT/USD .[1].c[0]
               >> .pubSub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|{pair:.[3],price:$base[1].c[0]}
---`,

  action: async (cmdArgs: string) => {
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, subscriptionName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    const { pair, interval, depth } = params
    print({ subscriptionName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PUBLIC ${subscriptionName} stream...`)
    const subscription = replSubscriptionHandler({ wsClient: publicWSClient, name: subscriptionName as PublicSubscription, pair, interval, depth }, jqFilter, asTable)
    wsSubscriptions.set(subscriptionName, subscription)
  }
})

myRepl.defineCommand('privSub', {
  help: `👉 Subscribe to PRIVATE WS stream. Usage >> .privSub subscriptionName <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

          i.e. >> .privSub openOrders .[0]|map(. as $order|keys[0]|$order[.])
`,

  action: async (cmdArgs: string) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, subscriptionName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    const { pair, interval, depth } = params
    print({ subscriptionName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PRIVATE ${subscriptionName} stream...`)
    const token = await gethWsAuthToken({ apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })
    const subscription = replSubscriptionHandler({ wsClient: privateWSClient, name: subscriptionName as PrivateSubscription, token, pair, interval, depth }, jqFilter, asTable)
    wsSubscriptions.set(subscriptionName, subscription)
  }
})

myRepl.defineCommand('unsub', {
  help: `👉 Closes WebSocket stream for GIVEN subscriptionName.

          i.e. >> .unsub ticker
               >> .unsub openOrders
`,

  action: async (subscriptionName) => {
    wsSubscriptions.get(subscriptionName)?.unsubscribe()
    if (wsSubscriptions.delete(subscriptionName)) {
      print(`${subscriptionName} unsubscribed!`)
    }
  }
})

myRepl.defineCommand('unsubAll', {
  help: `👉 Closes WebSocket stream for ALL subscriptions.

          i.e. >> .unsubAll
`,

  action: async () => {
    Array.from(wsSubscriptions).forEach(([subscriptionName, sub]) => {
      sub.unsubscribe()
      if (wsSubscriptions.delete(subscriptionName)) {
        print(`${subscriptionName} unsubscribed!`)
      }
    })
  }
})

// Shell entrypoint
myRepl.write('.help\n')
myRepl.write('.get Time .rfc1123')
setTimeout(() => print('\nPress enter to start...'), 10)
