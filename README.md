# ts-kraken

> A versatile unofficial _repl-cli/node-lib_ to operate against the **[Kraken](https://kraken.com) Crypto Exchange** [REST](https://docs.kraken.com/rest/) and [WebSocket](https://docs.kraken.com/websockets/) APIs
---

## Setup

> Install: `git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i`

* Play with the repl-cli: `npm run kraken-repl`

- Depend on the module as a library in your TypeScript project:

````
import { publicRESTRequest, privateRESTRequest, publicWSClient, privateWSClient } from 'ts-kraken'
````
---


## Demo Public REPL requests

### Track pair price
- `>> .pubSub ticker pair[]=XBT/USD .[1].c[0]`

### Track filtered fields for multiple pair prices
- `>> .pubSub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|{pair:.[3],price:$base[1].c[0]}`

### List filtered fields from all available trading pairs
- `>> .get AssetPairs . as $base|keys|map($base[.])|map({pair:.wsname,decimals:.pair_decimals,min:.ordermin}) -table`
---


## Demo Private REPL requests (requires API key/secret)

>_**Tip:**_ To display current keys in use the `.showKeys` command.
>To load your keys, you can either use the `.setKeys` command or create a `.env` file like the following under project root directory:

````
KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
````

### Account Balances
- `>> .post Balance -table`

### Trade Balances
- `>> .post TradeBalance -table`

### Status of Recent BTC Deposits
- `>> .post DepositStatus asset=XBT -table`

### Print Open-Orders table
- `>> .post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table`

### Print Closed-Orders table
- `>> .post ClosedOrders .closed as $closed|.closed|keys|map($closed[.].descr) -table`
---


## Resources

* [Kraken REST API docs](https://docs.kraken.com/rest/)
* [Kraken WebSockets API docs](https://docs.kraken.com/websockets/)
* [jq Manual](https://stedolan.github.io/jq/manual)
---


## Upcoming features

- Option to record all requests and incoming streams to json files
- Wrapper-REPL-Command prompting user for request params (with pre-flight validations) for each endpoint/subscription
