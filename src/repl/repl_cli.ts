#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import repl from 'repl';
import { parse } from 'qs'; /* https://stackoverflow.com/a/9547490 */
import { Observable, Subscription } from 'rxjs';
import { run } from 'node-jq';
import { JsonInput } from 'node-jq/lib/options';
import { privateRestRequest, privateWsSubscription, publicRestRequest, publicWsSubscription } from '..';
import { krakenHeader, purpleText } from './kraken_header';

let { KRAKEN_API_KEY = null, KRAKEN_API_SECRET = null } = globalThis.env;
const wsSubscriptions: Map<string, Subscription> = new Map();
const cmdRegExp = /\s*?(\S+)(?:\s+?(&?\S+=\S+)+)?(?:\s+(.+))?/;

const print = (content: unknown, asTable = false): void => asTable ? console.table(content) : console.log(purpleText(JSON.stringify(content, null, 4)));

const replSubscriptionHandler = (wsSubscription: Observable<unknown>, channelName: string, jqFilter?: string, asTable?: boolean): Subscription => wsSubscription
    .subscribe({
        next: async payload => {
            if (jqFilter) {
                const jqPayload = await run(`.payload|${jqFilter}`, { payload } as JsonInput, { input: 'json', output: 'json' });
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
                console.error(`\n${channelName} unsubscribed! Re-attempting subscription in 5 seconds...`);
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

console.log(purpleText(krakenHeader));
const myRepl = repl.start(purpleText('ts-kraken REPL >> '));

// Modify core methods (bit hacky, these are readonly)
['save', 'load', 'editor', 'clear', 'break'].forEach(c => delete (myRepl.commands as unknown)[c]);
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

            i.e.    >> ${purpleText('.get Time .rfc1123')}
                    >> ${purpleText('.get AssetPairs . as $base|keys|map($base[.])|map({wsname,tick_size,pair_decimals,ordermin}) -table')}
                    >> ${purpleText('.get AssetPairs pair=BTC/EUR . as $base|keys[0]|$base[.]|{wsname,tick_size,lot_decimals,pair_decimals,cost_decimals,ordermin}')}

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: async (cmdArgs: string) => {
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, endpoint, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        console.log({ endpoint, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('\nParse error. Please verify params and jqFilterExpr format.'); }

        try {
            const response = await publicRestRequest<any>({ url: endpoint, params });
            if (jqFilter) {
                const jqResponse = await run(jqFilter, response, { input: 'json', output: 'json' });
                print(jqResponse, asTable);
                return console.log('\nPress Return to continue or Control+C to exit...');
            }
            print(response, asTable);
            console.log('\nPress Return to continue or Control+C to exit...');
        } catch (publicRESTerror) {
            console.error({ publicRESTerror });
        }
    }
});

myRepl.defineCommand('post', {
    help: `👉 Fetch PRIVATE REST data.
                    
            Usage   >> .post <PrivateEndpoint>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> ${purpleText('.post OpenOrders .open as $open|.open|keys|map($open[.].descr.order)')}
                    >> ${purpleText('.post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table')}
                    >> ${purpleText('.post AddOrder ordertype=market&type=sell&volume=0.002&pair=ETHEUR')}
                    >> ${purpleText('.post BalanceEx [.ZEUR.balance,.ZEUR.hold_trade]|map_values(tonumber)|.[0]-.[1]')}
                    >> ${purpleText('.post CancelAll')}

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: async (cmdArgs: string) => {
        if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
            return console.error('No API key/secret loaded!');
        }
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, endpoint, rawData, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const data = parse(rawData);
        console.log({ endpoint, ...Object.keys(data).length ? { data } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('\nParse error. Please verify params and jqFilterExpr format.'); }

        try {
            const response = await privateRestRequest({ url: endpoint, data } as any, { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET });
            if (jqFilter) {
                const jqResponse = await run(jqFilter, response as JsonInput, { input: 'json', output: 'json' });
                print(jqResponse, asTable);
                return console.log('\nPress Return to continue or Control+C to exit...');
            }
            print(response, asTable);
            console.log('\nPress Return to continue or Control+C to exit...');

        } catch (privateRESTerror) {
            console.error({ privateRESTerror });
        }
    }
});

myRepl.defineCommand('pubsub', {
    help: `👉 Subscribe to PUBLIC WS stream.
                    
            Usage   >> .pubsub <subscriptionName>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> ${purpleText('.pubsub ticker symbol[]=BTC/EUR .data[0].last')}
                    >> ${purpleText('.pubsub ticker symbol[]=BTC/EUR&symbol[]=ADA/BTC&symbol[]=USDT/USD .data[0]|{symbol,last} -table')}

-----------------------------------------------------------------------------------------------------------------------------------------------------\n`,

    action: (cmdArgs: string) => {
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, channel, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        console.log({ channelName: channel, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('\nParse error. Please verify params and jqFilterExpr format.'); }

        print(`Subscribing to PUBLIC WebsocketV2 ${channel} stream...`);
        const subscription = publicWsSubscription({ channel, params } as any);
        const replSubscription = replSubscriptionHandler(subscription, channel, jqFilter, asTable);
        wsSubscriptions.set(channel, replSubscription);
    }
});

myRepl.defineCommand('privsub', {
    help: `👉 Subscribe to PRIVATE WS stream.
                    
            Usage   >> .privsub <subscriptionName>! <paramA=valueA&param_list[]=value1&param_list[]=value2>? <jqFilter>? <-table>?

            i.e.    >> ${purpleText('.privsub balances snap_orders=true .data|map({ asset, balance }) -table')}
                    >> ${purpleText('.privsub executions snap_orders=true .data|map({order_id,side,order_qty,symbol,order_type,limit_price}) -table')}
`,

    action: async (cmdArgs: string) => {
        if (!KRAKEN_API_KEY || !KRAKEN_API_SECRET) {
            return console.error('No API key/secret loaded!');
        }
        const paramsStr = cmdArgs.replace(' -table', '');
        const asTable = cmdArgs.includes(' -table');

        const [fullMatch, channel, rawParams, jqFilter] = paramsStr.match(cmdRegExp) ?? [];
        const params = parse(rawParams);
        console.log({ channelName: channel, ...Object.keys(params).length ? { params } : {}, ...jqFilter ? { jqFilter } : {} });
        if (!fullMatch) { return console.error('\nParse error. Please verify params and jqFilterExpr format.'); }

        for (const [obj, key, value] of iter(params)) {
            if (value?.trim().toLowerCase() === 'true') obj[key] = true;
            else if (value?.trim().toLowerCase() === 'false') obj[key] = false;
        }

        print(`Subscribing to PRIVATE WebsocketV2 ${channel} stream...`);
        const subscription = await privateWsSubscription(
            { channel, params } as any,
            { apiKey: KRAKEN_API_KEY, apiSecret: KRAKEN_API_SECRET }
        );
        const replSubscription = replSubscriptionHandler(subscription, channel, jqFilter, asTable);
        wsSubscriptions.set(channel, replSubscription);
    }
});

myRepl.defineCommand('unsub', {
    help: `👉 Closes WebSocket stream for GIVEN subscriptionName.

            i.e.    >> ${purpleText('.unsub ticker')}
                    >> ${purpleText('.unsub executions')}
`,

    action: (subscriptionName: string) => {
        if (!wsSubscriptions.get(subscriptionName)) {
            return console.error(`\nNo subscription available for ${subscriptionName} channel`);
        }

        wsSubscriptions.get(subscriptionName)?.unsubscribe();
        if (wsSubscriptions.delete(subscriptionName)) {
            console.log(`\n${subscriptionName} unsubscribed!`);
        }
    }
});

myRepl.defineCommand('unsuball', {
    help: `👉 Closes WebSocket stream for ALL subscriptions.

            i.e.    >> ${purpleText('.unsuball')}
`,

    action: () => {
        const subsArr = Array.from(wsSubscriptions);
        if (subsArr.length < 1) {
            console.error('\nNot subscribed to any channel yet...');
        }

        subsArr.forEach(([subscriptionName, sub]) => {
            sub.unsubscribe();
            if (wsSubscriptions.delete(subscriptionName)) {
                console.log(`\n${subscriptionName} unsubscribed!`);
            }
        });
    }
});

// Shell entrypoint
myRepl.write('.help\n');
myRepl.write('.get Time .rfc1123\n');
