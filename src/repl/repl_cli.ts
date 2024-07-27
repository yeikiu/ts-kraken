#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any,import/order */

import { config } from 'dotenv';
config();

import repl from 'repl';
import { parse } from 'qs'; /* https://stackoverflow.com/a/9547490 */
import { Observable, Subscription } from 'rxjs';
import { run } from 'node-jq';
import { publicRestRequest } from '../api/rest/public';
import { findClosedOrder, privateRestRequest } from '../api/rest/private';
import { getPublicSubscription } from '../api/ws/public/public_ws_client';
import { getPrivateSubscription } from '../api/ws/private/private_ws_client';
import krakenHeader from './kraken_header';
import { RestClosedOrder } from '../types/rest/private/endpoints';

let { KRAKEN_API_KEY, KRAKEN_API_SECRET } = process.env;
const wsSubscriptions: Map<string, Subscription> = new Map();
const cmdRegExp = /\s*?(\S+)(?:\s+?(&?\S+=\S+)+)?(?:\s+(.+))?/;

// TODO: extract to util imports
const print = (content: unknown, asTable = false): void => asTable ? console.table(content) : console.log(content);

// TODO: extract to util imports
const replSubscriptionHandler = (wsSubscription: Observable<any>, channelName: string, jqFilter?: string, asTable?: boolean): Subscription => wsSubscription
    .subscribe({
        next: async payload => {
            if (jqFilter) {
                const jqPayload = await run(`.payload|${jqFilter}`, { payload }, { input: 'json', output: 'json' });
                /* The `.payload|` jq prefix helps with a strange node-jq bug where arrays
                are printed as text to console by default even with `output: 'json'` */
                return print(jqPayload, asTable);
            }
            print(payload, asTable);
        },
        error: subscriptionError => {
            console.error({ subscriptionError });
            wsSubscriptions.get(channelName)?.unsubscribe();
            if (wsSubscriptions.delete(channelName)) {
                print(`${channelName} unsubscribed! Re-attempting subscription in 5 seconds...`);
            }

            setTimeout(() => {
                const reSubscription = replSubscriptionHandler(wsSubscription, channelName, jqFilter, asTable);
                wsSubscriptions.set(channelName, reSubscription);
            }, 5000);
        }
    });

// https://stackoverflow.com/a/65808577 | TODO: extract to util imports
function* iter(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (Object(value) !== value) yield [obj, key, value];
        else yield* iter(value);
    }
}

print(krakenHeader);
const myRepl = repl.start('kraken-repl >> ');

// Modify core methods (bit hacky, these are readonly)
['save', 'load', 'editor', 'clear', 'break'].forEach(c => delete (myRepl.commands as any)[c]);
const coreMethods = Object.keys(myRepl.commands);
const editedCoreMethods = coreMethods.reduce((p, c) => ({
    ...p,
    [c]: {
        ...myRepl.commands[c],
        help: `${c === '.exit' ? '\n\n' : ''}👉 ${myRepl.commands[c].help}

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`
    }
}), {});
Object.assign(myRepl.commands, editedCoreMethods);

// Custom commands
myRepl.defineCommand('setkeys', {
    help: `👉 Load API key/secret (non-persistent, use a .env file to reuse persistent keys)
`,

    action: () => myRepl.question('API-key: ', (key) => {
        KRAKEN_API_KEY = key;
        myRepl.question('API-secret: ', (secret) => { KRAKEN_API_SECRET = secret; });
    })
});

myRepl.defineCommand('showkeys', {
    help: `👉 Display current API key/secret in use

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,
    action: () => print({ KRAKEN_API_KEY, KRAKEN_API_SECRET })
});

myRepl.defineCommand('get', {
    help: `👉 Fetch PUBLIC REST data.
                    
            Usage   >> .get <PublicEndpoint>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> .get Time .rfc1123
                    >> .get AssetPairs . as $base|keys|map($base[.])|map({wsname,pair_decimals,ordermin}) -table

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: async (cmdArgs: string) => {
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, endpoint, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        print({ endpoint, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.'); }

        try {
            const response = await publicRestRequest({ url: endpoint, params } as any);
            if (jqFilter) {
                const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' });
                print(jqResponse, asTable);
                return print('\nPress return to continue or control+c to exit...');
            }
            print(response, asTable);
            print('\nPress return to continue or control+c to exit...');
        } catch (publicRESTerror) {
            console.error({ publicRESTerror });
        }
    }
});

myRepl.defineCommand('post', {
    help: `👉 Fetch PRIVATE REST data.
                    
            Usage   >> .post <PrivateEndpoint>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> .post OpenOrders .open as $open|.open|keys|map($open[.].descr.order)
                    >> .post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table
                    >> .post AddOrder ordertype=market&type=sell&volume=0.002&pair=ETHEUR
                    >> .post CancelAll

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: async (cmdArgs: string) => {
        if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
            return console.error('No API key/secret loaded!');
        }
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, endpoint, rawData, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const data = parse(rawData);
        print({ endpoint, ...Object.keys(data).length ? { data } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.'); }

        try {
            const response = await privateRestRequest({ url: endpoint, data } as any, { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET });
            if (jqFilter) {
                const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' });
                print(jqResponse, asTable);
                return print('\nPress return to continue or control+c to exit...');
            }
            print(response, asTable);
            print('\nPress return to continue or control+c to exit...');

        } catch (privateRESTerror) {
            console.error({ privateRESTerror });
        }
    }
});

myRepl.defineCommand('pubsub', {
    help: `👉 Subscribe to PUBLIC WS stream.
                    
            Usage   >> .pubsub <subscriptionName>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> .pubsub ticker symbol[]=BTC/EUR .data[0].last
                    >> .pubsub ticker symbol[]=BTC/EUR&symbol[]=ADA/BTC&symbol[]=USDT/USD .data[0]|{symbol,last} -table

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: (cmdArgs: string) => {
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, channel, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        print({ channelName: channel, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.'); }

        print(`Subscribing to PUBLIC WebsocketV2 ${channel} stream...`);
        const subscription = getPublicSubscription({ channel, params } as any);
        const replSubscription = replSubscriptionHandler(subscription, channel, jqFilter, asTable);
        wsSubscriptions.set(channel, replSubscription);
    }
});

myRepl.defineCommand('privsub', {
    help: `👉 Subscribe to PRIVATE WS stream.
                    
            Usage   >> .privsub <subscriptionName>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> .privsub balances snap_orders=true .data|map({ asset, balance }) -table
                    >> .privsub executions snap_orders=true .data|map({order_id, side, order_qty, symbol, order_type, limit_price}) -table
`,

    action: async (cmdArgs: string) => {
        if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
            return console.error('No API key/secret loaded!');
        }
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, channel, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        print({ channelName: channel, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('Parse error. Please verify params and jqFilterExpr format.'); }

        for (const [obj, key, value] of iter(params)) {
            if (value?.trim().toLowerCase() === 'true') obj[key] = true;
            else if (value?.trim().toLowerCase() === 'false') obj[key] = false;
        }

        print(`Subscribing to PRIVATE WebsocketV2 ${channel} stream...`);
        const subscription = await getPrivateSubscription(
            { channel, params } as any,
            { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET }
        );
        const replSubscription = replSubscriptionHandler(subscription, channel, jqFilter, asTable);
        wsSubscriptions.set(channel, replSubscription);
    }
});

myRepl.defineCommand('unsub', {
    help: `👉 Closes WebSocket stream for GIVEN subscriptionName.

            i.e.    >> .unsub ticker
                    >> .unsub executions
`,

    action: (subscriptionName: string) => {
        if (!wsSubscriptions.get(subscriptionName)) {
            return print(`No subscription available for ${subscriptionName} channel`);
        }

        wsSubscriptions.get(subscriptionName)?.unsubscribe();
        if (wsSubscriptions.delete(subscriptionName)) {
            print(`${subscriptionName} unsubscribed!`);
        }
    }
});

myRepl.defineCommand('unsuball', {
    help: `👉 Closes WebSocket stream for ALL subscriptions.

            i.e.    >> .unsuball
`,

    action: () => {
        Array.from(wsSubscriptions).forEach(([subscriptionName, sub]) => {
            sub.unsubscribe();
            if (wsSubscriptions.delete(subscriptionName)) {
                print(`${subscriptionName} unsubscribed!`);
            }
        });
    }
});

myRepl.defineCommand('find', {
    help: `👉 Finds the most recent closed order satisfying the filter within maxOffset range for given pair.
                    
            Usage   >> .find <pair>! <orderMatchFilter>! <maxOffset>! <jqFilter>! (all params are mandatory!)

            i.e.    >> .find ADAETH descr[type]=buy 500 .descr.order
                    >> .find BTCUSD descr[type]=sell 500 .descr.order
`,

    action: async (orderPairAndFilterStr: string) => {
        const isSubset = (superObj, subObj) => {
            return Object.keys(subObj).every(ele => {
                if (typeof subObj[ele] === 'object') {
                    return isSubset(superObj[ele], subObj[ele]);
                }
                return subObj[ele] === superObj[ele];
            });
        };

        if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
            return console.error('No API key/secret loaded!');
        }

        const [pairStr, orderFilterStr = '', maxOffset = 1000, jqFilter = ''] = orderPairAndFilterStr.split(' ').map((str) => str.trim());
        const pair = pairStr.toUpperCase().replace('/', '');
        const parsedFilter = parse(orderFilterStr ?? {});
        const orderFilter: Partial<RestClosedOrder> = {
            ...parsedFilter,
            descr: { ...parsedFilter?.descr ?? {}, pair }
        };
        console.log({ orderFilter });
        const matchingOrder = await findClosedOrder({
            orderFilter: (o: Partial<RestClosedOrder>) => isSubset(o, orderFilter),
            maxOffset: Number(maxOffset),
        });

        if (jqFilter) {
            const jqPayload = await run(jqFilter, matchingOrder, { input: 'json', output: 'json' });
            /* The `.payload|` jq prefix helps with a strange node-jq bug where arrays
            are printed as text to console by default even with `output: 'json'` */
            return print(jqPayload);
        }
        print(matchingOrder);
    }
});

// Shell entrypoint
myRepl.write('.help\n');
myRepl.write('.get Time .rfc1123');
setTimeout(() => print('\nPress enter to start...'), 10);
