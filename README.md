# ts-kraken

## Fun with the REPL
> `npx ts-kraken`

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

### Track pair price
- `>> .pubSub ticker pair[]=XBT/USD .[1].p[0]`

### Track filtered fields for multiple pair prices
- `>> .pubSub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|{pair:.[3],price:$base[1].p[0]}`

### List filtered fields from all available trading pairs
- `>> .get AssetPairs . as $base|keys|map($base[.])|map({pair:.wsname,decimals:.pair_decimals,min:.ordermin}) -table`
