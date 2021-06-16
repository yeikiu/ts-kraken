<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

<h1 align="center">
  <br>
  <img src=".github/ts_kraken_logo.png" width="640px" alt="ts-ts_kraken_logo" />
</h1>

<br /><br />

<h4 align="center">A versatile unofficial <i>ts-lib & node-repl-cli</i> to operate against the <a href="https://kraken.com">Kraken Crypto Exchange</a></h4>
<br />
<p align="center">
  <a href="#about">About</a> •
  <a href="#tldr-get-started">TLDR</a> •
  <a href="#installation">Installation</a> •
  <a href="#resources">Resources</a> •
  <a href="#upcoming-features">Upcoming</a>
</p>

<br />

---

<br />


## About
  
> **ts-kraken** is a **highly-typed** _Typescript Library_ to operate against the **[Kraken](https://kraken.com) Crypto Exchange** [REST](https://docs.kraken.com/rest/) and [WebSocket](https://docs.kraken.com/websockets/) APIs

> It also features an **interactive** _node REPL-cli_ to operate via command-shell 🤓

![ts_kraken_demo](.github/ts_kraken_demo.gif)

<br />

---

<br />


## TLDR; Get started
## Launch the REPL directly on your terminal with `npx`:

> Quickest way to test it out! 🚀 - _Unreleased,_ coming soon!

````
npx ts-kraken
````

<br />

### REPL commands

* **.help**
<br />

* **.setkeys**
<br />

* **.showkeys**
<br />

* **.get** PublicEndpoint _params? jqFilter? -table?_

````
.get Ticker pair=XBTUSD .XXBTZUSD|.c[0]|{BTC_PRICE:.}
````

````
.get AssetPairs . as $base|keys|map($base[.])|map({pair:.wsname,decimals:.pair_decimals,min:.ordermin}) -table
````
<br />

* **.post** PrivateEndpoint _params? jqFilter? -table?_

````
.post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table
````
<br />

* **.pubsub** PublicChannel _params? jqFilter? -table?_

````
.pubSub ticker pair[]=XBT/USD .[1].c[0]
````

````
.pubsub ticker pair[]=XBT/USD&pair[]=ETH/USD . as $base|{pair:.[3],price:$base[1].c[0]}
````
<br />

* **.privsub** PrivateChannel _params? jqFilter? -table?_

````
.privsub openOrders .[0]|map(. as $order|keys[0]|$order[.])
````
<br />

* **.unsub** ChannelName

````
.unsub ohlc
````
<br />

* **.unsuball**

<br />

---

<br />


## Installation
### Setup in a standalone directory and have fun with the REPL:

> Recommended if planning to use regularly

````
git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i
````

> You can create a `.env` file like the following under project's root directory to reuse the keys:

````
touch .env
````

````
# .env's file content holding your API key/secret

KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
````

````
npm run kraken-repl
````

<br />

---

<br />


### Setup as a library in your TypeScript/JS project:

> Get _IDE code-suggestions_ for any REST or WS request you need

````
cd dependant/project/path && npm i ts-kraken
````

<img src=".github/ts_kraken_ide.gif" width="640px" alt="ts_kraken_ide" />


## Demo playground snippet

````typescript
import { config } from 'dotenv'
config() // Load API key/secret from .env file
import { publicRESTRequest, privateRESTRequest, getOpenOrdersStream } from 'ts-kraken'

const testTsKraken = async () => {

    const allTradingPairs = await publicRESTRequest({ url: 'AssetPairs' })
    console.log(`Total trading pairs: ${allTradingPairs}`)

    const ethTradingPairInfo = await publicRESTRequest({ url: 'AssetPairs', params: { pair: 'ETHEUR' }})
    console.log({ ethTradingPairInfo })

    // Notice we are not passing keys as params here, process.env ones will be used
    const { openOrders$ } = await getOpenOrdersStream()
    openOrders$.subscribe(openOrdersSnapshot => {
        // Track any order update
        console.log({ openOrdersSnapshot })
    })

    // Fetch balance from a different account injecting keys in runtime
    const currentBalances = await privateRESTRequest({ url: 'Balance' }, { apiKey: 'otherKey', apiSecret: 'otherSecret' })
    console.log({ currentBalances })

}

testTsKraken()
````

<br />

---

<br />


## Resources

* [Kraken REST API docs](https://docs.kraken.com/rest/)
* [Kraken WebSockets API docs](https://docs.kraken.com/websockets/)
* [jq Manual](https://stedolan.github.io/jq/manual)

<br />

---

<br />


## Upcoming features

- Option to record all requests and incoming streams to json files
- Wrapper-REPL-Command prompting user for request params (with pre-flight validations) for each endpoint/subscription

<br />

---

<br />
