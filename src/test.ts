import { getWsAuthToken, publicRestRequest,/* , privateRestRequest, getOpenOrdersStream, getBookStream */ } from '.'
import { getPublicSubscription, sendPublicEvent, publicWsHeartbeat$, publicWsStatus$ } from './ws/public_ws_client'
import { getPrivateSubscription, sendPrivateEvent, privateWsHeartbeat$, privateWsStatus$ } from './ws/private_ws_client'

const testTsKraken = async () => {

  /* const allTradingPairs = await publicRestRequest({ url: 'AssetPairs' })
  console.log(`Total trading pairs: ${Object.keys(allTradingPairs).length}`)

  const ethTradingPairInfo = await publicRestRequest({ url: 'AssetPairs', params: { pair: 'ETHEUR' } })
  console.log({ ethTradingPairInfo }) */

  /* // Fetch balance from a different account injecting keys in runtime
  const currentBalances = await privateRestRequest({ url: 'Balance' })
  console.log({ currentBalances })

  // Notice we are not passing an `apiKeys` param in the next private method, process.env ones will be used by default
  const { openOrders$ } = await getOpenOrdersStream()
  openOrders$.subscribe(openOrdersSnapshot => {
    // Output all open orders any time an order status updates
    console.log({ openOrdersSnapshot })
  }) */

  /* const { bookSnapshot$ } = getBookStream({
    baseAsset: 'ETH',       
    quoteAsset: 'EUR',
    depth: 10
  })
  bookSnapshot$.subscribe(({ asks, bids, checksum })=> {
    console.log({ asks, bids, checksum })
  }) */

  /*   WSPrivateHeartbeat$.subscribe(heartbeatUpdate => console.log({ heartbeatUpdate }))
  WSPublicStatus$.subscribe(statusUpdate => console.log(JSON.stringify({ statusUpdate }, null, 4)))

  sendPublicEvent({
    method: 'ping',
    req_id: 1
  }).then(eventResponse => console.log({ eventResponse })) */

  /* const sub = getPublicSubscription({
    channel: 'ohlc',
    params: {
      symbol: ['ETH/USD'],
      interval: 1,
    },
    req_id: 2
  });
  sub.subscribe(subUpdate => console.log({ subUpdate })) */

  /* const token = await getWsAuthToken();
  console.log({token}) */
  const privateSub = await getPrivateSubscription({
    channel: 'balances',
    req_id: 2,
    params: {
      snapshot: true
    }
  });
  privateSub.subscribe(({ data }) => console.log({ data }))
}

testTsKraken()