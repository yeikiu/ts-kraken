import { publicRESTRequest, privateRESTRequest, getOpenOrdersStream, getBookStream } from '.'

const testTsKraken = async () => {

  const allTradingPairs = await publicRESTRequest({ url: 'AssetPairs' })
  console.log(`Total trading pairs: ${Object.keys(allTradingPairs).length}`)

  const ethTradingPairInfo = await publicRESTRequest({ url: 'AssetPairs', params: { pair: 'ETHEUR' }})
  console.log({ ethTradingPairInfo })

  // Fetch balance from a different account injecting keys in runtime
  const currentBalances = await privateRESTRequest({ url: 'Balance' })
  console.log({ currentBalances })

  // Notice we are not passing an `apiKeys` param in the next private method, process.env ones will be used by default
  const { openOrders$ } = await getOpenOrdersStream()
  openOrders$.subscribe(openOrdersSnapshot => {
    // Output all open orders any time an order status updates
    console.log({ openOrdersSnapshot })
  })

  const { bookSnapshot$ } = getBookStream({
    baseAsset: 'ETH',       
    quoteAsset: 'EUR',
    depth: 10
  })
  bookSnapshot$.subscribe(({ asks, bids, checksum })=> {
    console.log({ asks, bids, checksum })
  })
}

testTsKraken()