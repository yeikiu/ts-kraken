#!/usr/bin/env node
import { config } from 'dotenv'
import repl from 'repl'
import { parse } from 'qs' /* https://stackoverflow.com/a/9547490 */
import { Observable, Subscription } from 'rxjs'
import krakenHeader from './kraken_header'
import { run } from 'node-jq'
import { getPublicSubscription, getPrivateSubscription, publicRESTRequest, privateRESTRequest } from '..'

config()

let { KRAKEN_API_KEY, KRAKEN_API_SECRET } = process.env
const wsSubscriptions: Map<string, Subscription> = new Map()
const cmdRegExp = /\s*?(\S+)(?:\s+?(&?\S+=\S+)+)?(?:\s+(.+))?/

// TODO: extract to util imports
const print = (content: unknown, asTable = false): void => asTable ? console.table(content) : console.log(content)

// TODO: extract to util imports
const replSubscriptionHandler = (wsSubscription: Observable<any>, channelName: string, jqFilter?: string, asTable?: boolean): Subscription => wsSubscription
  .subscribe({
    next: async payload => {
      if (jqFilter) {
        const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' })
        /* The `.payload|` jq prefix helps with a strange node-jq bug where arrays
        are printed as text to console by default even with `output: 'json'` */
        return print(jqPayload, asTable)
      }
      print(payload, asTable)
    },
    error: subscriptionError => {
      console.error({ subscriptionError })
      wsSubscriptions.get(channelName)?.unsubscribe()
      if (wsSubscriptions.delete(channelName)) {
        print(`${channelName} unsubscribed! Re-attempting subscription in 5 seconds...`)
      }

      setTimeout(() => {
        const reSubscription = replSubscriptionHandler(wsSubscription, channelName, jqFilter, asTable)
        wsSubscriptions.set(channelName, reSubscription)
      }, 5000)
    }
  })

print(krakenHeader())
const myRepl = repl.start('kraken-repl >> ');

// Modify core methods (bit hacky, these are readonly)
['save', 'load', 'editor', 'clear', 'break'].forEach(c => delete (myRepl.commands as any)[c])
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
myRepl.defineCommand('setkeys', {
  help: `👉 Load API key/secret (non-persistent, use a .env file to reuse persistent keys)
`,

  action: () => myRepl.question('API-key: ', (key) => {
    KRAKEN_API_KEY = key
    myRepl.question('API-secret: ', (secret) => { KRAKEN_API_SECRET = secret })
  })
})

myRepl.defineCommand('showkeys', {
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
      const response = await publicRESTRequest({ url: endpoint, params } as any)
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
      const response = await privateRESTRequest({ url: endpoint, data } as any, { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })
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

myRepl.defineCommand('pubsub', {
  help: `👉 Subscribe to PUBLIC WS stream. Usage >> .pubsub subscriptionName <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

          i.e. >> .pubsub ticker pair[]=XBT/USD .[1].c[0]
               >> .pubsub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|{pair:.[3],price:$base[1].c[0]}
---`,

  action: (cmdArgs: string) => {
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, channelName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    const { pair, interval, depth } = params
    print({ channelName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PUBLIC ${channelName} stream...`)
    const subscription = getPublicSubscription({ channelName, pair, interval, depth } as any)
    const replSubscription = replSubscriptionHandler(subscription, channelName, jqFilter, asTable)
    wsSubscriptions.set(channelName, replSubscription)
  }
})

myRepl.defineCommand('privsub', {
  help: `👉 Subscribe to PRIVATE WS stream. Usage >> .privsub subscriptionName <paramA=valueA&param_list[]=value1&param_list[]=value2> <jqFilterExpr>

          i.e. >> .privsub openOrders .[0]|map(. as $order|keys[0]|$order[.])
`,

  action: async (cmdArgs: string) => {
    if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
      return console.error('No API key/secret loaded!')
    }
    const paramsStr = cmdArgs.replace(' -table', '')
    const asTable = cmdArgs.includes(' -table')

    const [fullMatch, channelName, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? []
    const params = parse(rawParams)
    const { snapshot, ratecounter } = params as any
    print({ channelName, params, jqFilter })
    if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.') }

    print(`Subscribing to PRIVATE ${channelName} stream...`)
    const subscription = await getPrivateSubscription({
      channelName,
      ...snapshot ? { snapshot } : {},
      ...ratecounter ? { ratecounter } : {}
    } as any, { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET })
    const replSubscription = replSubscriptionHandler(subscription, channelName, jqFilter, asTable)
    wsSubscriptions.set(channelName, replSubscription)
  }
})

myRepl.defineCommand('unsub', {
  help: `👉 Closes WebSocket stream for GIVEN subscriptionName.

          i.e. >> .unsub ticker
               >> .unsub openOrders
`,

  action: (subscriptionName: string) => {
    if (!wsSubscriptions.get(subscriptionName)) {
      return print(`No subscription available for ${subscriptionName} channel`)
    }

    wsSubscriptions.get(subscriptionName)?.unsubscribe()
    if (wsSubscriptions.delete(subscriptionName)) {
      print(`${subscriptionName} unsubscribed!`)
    }
  }
})

myRepl.defineCommand('unsuball', {
  help: `👉 Closes WebSocket stream for ALL subscriptions.

          i.e. >> .unsuball
`,

  action: () => {
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
