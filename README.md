# ts-kraken

## Fun with the REPL examples
> `npx kraken-repl`

### Account Balances
- `>> .post Balance -table`

### Trade Balances
- `>> .post Balance -table`

### Status of Recent BTC Deposits
- `>> .post DepositStatus asset=XBT -table`

### Open-Orders
- `>> .post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table`

### Closed-Orders
- `>> .post ClosedOrders .closed as $closed|.closed|keys|map($closed[.].descr) -table`

### Track pair price
- `.pubSub ticker pair[]=XBT/USD .[1].p[0]`

### Track multiple pair prices
- `.pubSub ticker pair[]=XBT/USD&pair[]=ADA/XBT&pair[]=USDT/USD . as $base|.[3] as $pair|$base[1].p[0] as $price| {$pair,$price}`
