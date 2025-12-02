import type { MethodCategory } from '../types/ui-types';

export const methodCategories: MethodCategory[] = [
  {
    name: 'REST - Public',
    methods: [
      {
        name: 'Time',
        endpoint: 'Time',
        type: 'rest-public',
        description: 'Get server time',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-server-time',
        params: []
      },
      {
        name: 'System Status',
        endpoint: 'SystemStatus',
        type: 'rest-public',
        description: 'Get system status',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-system-status',
        params: []
      },
      {
        name: 'Asset Pairs',
        endpoint: 'AssetPairs',
        type: 'rest-public',
        description: 'Get tradable asset pairs',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-tradable-asset-pairs',
        params: [
          {
            name: 'pair',
            type: 'asset-pairs',
            required: false,
            description: 'Comma-delimited list of asset pairs to get info about (leave empty for all pairs)'
          },
          {
            name: 'info',
            type: 'select',
            required: false,
            description: 'Info to retrieve',
            options: ['info', 'leverage', 'fees', 'margin']
          }
        ]
      },
      {
        name: 'Assets',
        endpoint: 'Assets',
        type: 'rest-public',
        description: 'Get asset info',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-asset-info',
        params: [
          {
            name: 'asset',
            type: 'assets',
            required: false,
            description: 'Comma-delimited list of assets to get info about (leave empty for all assets)'
          }
        ]
      },
      {
        name: 'Ticker',
        endpoint: 'Ticker',
        type: 'rest-public',
        description: 'Get ticker information',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-ticker-information',
        params: [
          {
            name: 'pair',
            type: 'asset-pairs',
            required: false,
            description: 'Asset pair to get data for (leave empty for all tradeable pairs)'
          },
          {
            name: 'asset_class',
            type: 'select',
            required: false,
            description: 'Required for tokenized pairs (e.g., xstocks). If provided without pair, returns all pairs for that asset class. Default: forex',
            options: ['forex', 'tokenized_asset']
          }
        ]
      },
      {
        name: 'OHLC',
        endpoint: 'OHLC',
        type: 'rest-public',
        description: 'Get OHLC (candlestick) data',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-ohlc-data',
        params: [
          {
            name: 'pair',
            type: 'string',
            required: true,
            description: 'Asset pair (e.g., XBTUSD)'
          },
          {
            name: 'interval',
            type: 'select',
            required: false,
            description: 'Time frame interval in minutes',
            options: ['1', '5', '15', '30', '60', '240', '1440', '10080', '21600']
          }
        ]
      },
      {
        name: 'Order Book',
        endpoint: 'Depth',
        type: 'rest-public',
        description: 'Get order book depth',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-order-book',
        params: [
          {
            name: 'pair',
            type: 'string',
            required: true,
            description: 'Asset pair (e.g., XBTUSD)'
          },
          {
            name: 'count',
            type: 'number',
            required: false,
            description: 'Maximum number of asks/bids'
          }
        ]
      },
      {
        name: 'Recent Trades',
        endpoint: 'Trades',
        type: 'rest-public',
        description: 'Get recent trades. Returns the last 1000 trades by default',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-recent-trades',
        params: [
          {
            name: 'pair',
            type: 'asset-pair',
            required: true,
            description: 'Asset pair to get data for (e.g., XBTUSD)'
          },
          {
            name: 'since',
            type: 'string',
            required: false,
            description: 'Return trade data since given timestamp (e.g., 1616663618)'
          },
          {
            name: 'count',
            type: 'number',
            required: false,
            description: 'Return specific number of trades, up to 1000. Default: 1000'
          },
          {
            name: 'asset_class',
            type: 'select',
            required: false,
            description: 'Required for non-crypto pairs (e.g., xstocks)',
            options: ['tokenized_asset']
          }
        ]
      },
      {
        name: 'Recent Spreads',
        endpoint: 'Spread',
        type: 'rest-public',
        description: 'Get recent spreads. Returns the last ~200 top-of-book spreads for a given pair',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-recent-spreads',
        params: [
          {
            name: 'pair',
            type: 'asset-pair',
            required: true,
            description: 'Asset pair to get spread data for (e.g., XBTUSD)'
          },
          {
            name: 'since',
            type: 'string',
            required: false,
            description: 'Return spread data since given timestamp'
          }
        ]
      }
    ]
  },
  {
    name: 'REST - Private',
    methods: [
      {
        name: 'Balance',
        endpoint: 'Balance',
        type: 'rest-private',
        description: 'Get account balance',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-account-balance',
        params: []
      },
      {
        name: 'Balance Extended',
        endpoint: 'BalanceEx',
        type: 'rest-private',
        description: 'Get extended balance info',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-extended-balance',
        params: []
      },
      {
        name: 'Trade Balance',
        endpoint: 'TradeBalance',
        type: 'rest-private',
        description: 'Get summary of collateral balances, margin position valuations, equity and margin level',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-trade-balance',
        params: [
          {
            name: 'asset',
            type: 'asset',
            required: false,
            description: 'Base asset used to determine balance (default: ZUSD)'
          },
          {
            name: 'rebase_multiplier',
            type: 'select',
            required: false,
            description: 'Optional parameter for viewing xstocks data (default: rebased)',
            options: ['rebased', 'base']
          }
        ]
      },
      {
        name: 'Open Orders',
        endpoint: 'OpenOrders',
        type: 'rest-private',
        description: 'Retrieve information about currently open orders',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-open-orders',
        params: [
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Whether or not to include trades related to position in output'
          },
          {
            name: 'userref',
            type: 'number',
            required: false,
            description: 'Restrict results to given user reference id'
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Filter by client order ID (mutually exclusive with userref)'
          }
        ]
      },
      {
        name: 'Closed Orders',
        endpoint: 'ClosedOrders',
        type: 'rest-private',
        description: 'Retrieve information about orders that have been closed (filled or cancelled). 50 results are returned at a time',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-closed-orders',
        params: [
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Whether or not to include trades in output'
          },
          {
            name: 'userref',
            type: 'number',
            required: false,
            description: 'Restrict results to given user reference id'
          },
          {
            name: 'start',
            type: 'string',
            required: false,
            description: 'Starting unix timestamp or order tx ID'
          },
          {
            name: 'end',
            type: 'string',
            required: false,
            description: 'Ending unix timestamp or order tx ID'
          },
          {
            name: 'ofs',
            type: 'number',
            required: false,
            description: 'Result offset for pagination (increment by 50)'
          },
          {
            name: 'closetime',
            type: 'select',
            required: false,
            description: 'Which time to use (default: both)',
            options: ['open', 'close', 'both']
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Filter by client order ID'
          }
        ]
      },
      {
        name: 'Query Orders',
        endpoint: 'QueryOrders',
        type: 'rest-private',
        description: 'Retrieve information about specific orders',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-orders-info',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: true,
            description: 'Comma delimited list of transaction IDs to query info about'
          },
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Whether or not to include trades related to position in output'
          },
          {
            name: 'userref',
            type: 'number',
            required: false,
            description: 'Restrict results to given user reference id'
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Filter by client order ID'
          }
        ]
      },
      {
        name: 'Trades History',
        endpoint: 'TradesHistory',
        type: 'rest-private',
        description: 'Retrieve information about trades/fills. 50 results are returned at a time',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-trades-history',
        params: [
          {
            name: 'type',
            type: 'select',
            required: false,
            description: 'Type of trade (default: all)',
            options: ['all', 'any position', 'closed position', 'closing position', 'no position']
          },
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Whether or not to include trades related to position in output'
          },
          {
            name: 'start',
            type: 'string',
            required: false,
            description: 'Starting unix timestamp or trade tx ID'
          },
          {
            name: 'end',
            type: 'string',
            required: false,
            description: 'Ending unix timestamp or trade tx ID'
          },
          {
            name: 'ofs',
            type: 'number',
            required: false,
            description: 'Result offset for pagination'
          }
        ]
      },
      {
        name: 'Query Trades',
        endpoint: 'QueryTrades',
        type: 'rest-private',
        description: 'Retrieve information about specific trades/fills',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-trades-info',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: true,
            description: 'Comma delimited list of transaction IDs to query info about'
          },
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            description: 'Whether or not to include trades related to ledger entries'
          }
        ]
      },
      {
        name: 'Open Positions',
        endpoint: 'OpenPositions',
        type: 'rest-private',
        description: 'Get information about open margin positions',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-open-positions',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: false,
            description: 'Comma delimited list of txids to limit output to'
          },
          {
            name: 'docalcs',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Whether to include P&L calculations'
          },
          {
            name: 'consolidation',
            type: 'string',
            required: false,
            description: 'Consolidate positions by market/pair (default: market)'
          }
        ]
      },
      {
        name: 'Ledgers',
        endpoint: 'Ledgers',
        type: 'rest-private',
        description: 'Retrieve information about ledger entries. 50 results are returned at a time',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-ledgers-info',
        params: [
          {
            name: 'asset',
            type: 'string',
            required: false,
            description: 'Comma delimited list of assets to restrict output to (default: all)'
          },
          {
            name: 'aclass',
            type: 'string',
            required: false,
            description: 'Asset class (default: currency)'
          },
          {
            name: 'type',
            type: 'select',
            required: false,
            description: 'Type of ledger to retrieve (default: all)',
            options: ['all', 'deposit', 'withdrawal', 'trade', 'margin', 'rollover', 'credit', 'transfer', 'settled', 'staking', 'dividend', 'sale', 'nft_rebate']
          },
          {
            name: 'start',
            type: 'string',
            required: false,
            description: 'Starting unix timestamp or ledger ID'
          },
          {
            name: 'end',
            type: 'string',
            required: false,
            description: 'Ending unix timestamp or ledger ID'
          },
          {
            name: 'ofs',
            type: 'number',
            required: false,
            description: 'Result offset for pagination'
          }
        ]
      },
      {
        name: 'Query Ledgers',
        endpoint: 'QueryLedgers',
        type: 'rest-private',
        description: 'Retrieve information about specific ledger entries',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-ledgers',
        params: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Comma delimited list of ledger IDs to query info about'
          },
          {
            name: 'trades',
            type: 'boolean',
            required: false,
            description: 'Whether or not to include trades related to ledger entries'
          }
        ]
      },
      {
        name: 'Trade Volume',
        endpoint: 'TradeVolume',
        type: 'rest-private',
        description: 'Returns 30 day USD trading volume and resulting fee schedule for any asset pair(s) provided',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-trade-volume',
        params: [
          {
            name: 'pair',
            type: 'asset-pairs',
            required: false,
            description: 'Comma delimited list of asset pairs to get fee info on'
          }
        ]
      },
      {
        name: 'Add Order',
        endpoint: 'AddOrder',
        type: 'rest-private',
        description: 'Place a new order',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/add-order',
        params: [
          {
            name: 'pair',
            type: 'asset-pair',
            required: true,
            description: 'Asset pair id or altname'
          },
          {
            name: 'type',
            type: 'select',
            required: true,
            description: 'Type of order',
            options: ['buy', 'sell']
          },
          {
            name: 'ordertype',
            type: 'select',
            required: true,
            description: 'Order type',
            options: ['market', 'limit', 'stop-loss', 'take-profit', 'stop-loss-limit', 'take-profit-limit', 'settle-position', 'trailing-stop', 'trailing-stop-limit']
          },
          {
            name: 'volume',
            type: 'string',
            required: true,
            description: 'Order quantity in terms of the base asset'
          },
          {
            name: 'displayvol',
            type: 'string',
            required: false,
            description: 'Used to create an iceberg order'
          },
          {
            name: 'price',
            type: 'string',
            required: false,
            description: 'Limit price for limit orders'
          },
          {
            name: 'price2',
            type: 'string',
            required: false,
            description: 'Secondary price for stop-loss, take-profit orders'
          },
          {
            name: 'trigger',
            type: 'select',
            required: false,
            description: 'Price trigger for stop orders',
            options: ['index', 'last']
          },
          {
            name: 'leverage',
            type: 'string',
            required: false,
            description: 'Amount of leverage desired (default: none)'
          },
          {
            name: 'reduce_only',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Reduce-only flag'
          },
          {
            name: 'stptype',
            type: 'select',
            required: false,
            description: 'Self-trade prevention type',
            options: ['cancel-newest', 'cancel-oldest', 'cancel-both']
          },
          {
            name: 'oflags',
            type: 'string',
            required: false,
            description: 'Comma delimited list of order flags (post, fcib, fciq, nompp, viqc)'
          },
          {
            name: 'timeinforce',
            type: 'select',
            required: false,
            description: 'Time-in-force',
            options: ['GTC', 'IOC', 'GTD']
          },
          {
            name: 'starttm',
            type: 'string',
            required: false,
            description: 'Scheduled start time (unix timestamp or time string)'
          },
          {
            name: 'expiretm',
            type: 'string',
            required: false,
            description: 'Expiration time (unix timestamp or time string)'
          },
          {
            name: 'close_ordertype',
            type: 'string',
            required: false,
            description: 'Conditional close order type'
          },
          {
            name: 'close_price',
            type: 'string',
            required: false,
            description: 'Conditional close order price'
          },
          {
            name: 'close_price2',
            type: 'string',
            required: false,
            description: 'Conditional close order price2'
          },
          {
            name: 'deadline',
            type: 'string',
            required: false,
            description: 'RFC3339 timestamp for expiration'
          },
          {
            name: 'userref',
            type: 'number',
            required: false,
            description: 'User reference id (32-bit signed number)'
          },
          {
            name: 'validate',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Validate inputs only. Do not submit order'
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Client order ID'
          }
        ]
      },
      {
        name: 'Edit Order',
        endpoint: 'EditOrder',
        type: 'rest-private',
        description: 'Edit the order parameters of a live order (legacy, use AmendOrder instead)',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/edit-order',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: true,
            description: 'Original transaction ID'
          },
          {
            name: 'pair',
            type: 'asset-pair',
            required: true,
            description: 'Asset pair id or altname'
          },
          {
            name: 'volume',
            type: 'string',
            required: false,
            description: 'Updated order quantity in terms of the base asset'
          },
          {
            name: 'displayvol',
            type: 'string',
            required: false,
            description: 'Updated iceberg quantity'
          },
          {
            name: 'price',
            type: 'string',
            required: false,
            description: 'Updated limit price'
          },
          {
            name: 'price2',
            type: 'string',
            required: false,
            description: 'Updated stop/trigger price'
          },
          {
            name: 'oflags',
            type: 'string',
            required: false,
            description: 'Updated order flags'
          },
          {
            name: 'deadline',
            type: 'string',
            required: false,
            description: 'RFC3339 timestamp'
          },
          {
            name: 'cancel_response',
            type: 'boolean',
            required: false,
            description: 'Return cancel response in addition to edit response'
          },
          {
            name: 'userref',
            type: 'number',
            required: false,
            description: 'User reference id'
          },
          {
            name: 'validate',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: 'Validate inputs only'
          }
        ]
      },
      {
        name: 'Amend Order',
        endpoint: 'AmendOrder',
        type: 'rest-private',
        description: 'Amend an existing order (post-only flag, price, quantity)',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/amend-order',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: false,
            description: 'Order ID to amend (txid or cl_ord_id required)'
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Client order ID to amend (txid or cl_ord_id required)'
          },
          {
            name: 'order_qty',
            type: 'string',
            required: false,
            description: 'New order quantity'
          },
          {
            name: 'display_qty',
            type: 'string',
            required: false,
            description: 'New display quantity (for iceberg orders)'
          },
          {
            name: 'limit_price',
            type: 'string',
            required: false,
            description: 'New limit price'
          },
          {
            name: 'trigger_price',
            type: 'string',
            required: false,
            description: 'New trigger price (for conditional orders)'
          },
          {
            name: 'post_only',
            type: 'boolean',
            required: false,
            description: 'Post-only flag'
          },
          {
            name: 'deadline',
            type: 'string',
            required: false,
            description: 'RFC3339 timestamp deadline'
          }
        ]
      },
      {
        name: 'Cancel Order',
        endpoint: 'CancelOrder',
        type: 'rest-private',
        description: 'Cancel a particular open order by txid, userref or cl_ord_id',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/cancel-order',
        params: [
          {
            name: 'txid',
            type: 'string',
            required: false,
            description: 'Transaction ID (can be comma-separated for multiple)'
          },
          {
            name: 'cl_ord_id',
            type: 'string',
            required: false,
            description: 'Client order ID (can be comma-separated for multiple)'
          }
        ]
      },
      {
        name: 'Cancel All Orders',
        endpoint: 'CancelAll',
        type: 'rest-private',
        description: 'Cancel all open orders',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/cancel-all-orders',
        params: []
      },
      {
        name: 'Cancel All After',
        endpoint: 'CancelAllOrdersAfter',
        type: 'rest-private',
        description: 'Cancel all orders after X seconds',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/cancel-all-orders-after-x',
        params: [
          {
            name: 'timeout',
            type: 'number',
            required: true,
            description: 'Timeout in seconds (0 to disable)'
          }
        ]
      },
      {
        name: 'Add Order Batch',
        endpoint: 'AddOrderBatch',
        type: 'rest-private',
        description: 'Place multiple orders at once (max 15 orders)',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/add-order-batch',
        supportsData: true,
        params: [
          {
            name: 'pair',
            type: 'string',
            required: true,
            description: 'Asset pair (all orders must use same pair)'
          },
          {
            name: 'orders',
            type: 'string',
            required: true,
            description: 'JSON array of order objects (max 15). Use Data tab for complex input'
          },
          {
            name: 'deadline',
            type: 'string',
            required: false,
            description: 'RFC3339 timestamp deadline'
          },
          {
            name: 'validate',
            type: 'boolean',
            required: false,
            description: 'Validate inputs only'
          }
        ]
      },
      {
        name: 'Cancel Order Batch',
        endpoint: 'CancelOrderBatch',
        type: 'rest-private',
        description: 'Cancel multiple orders at once (max 50)',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/cancel-order-batch',
        supportsData: true,
        params: [
          {
            name: 'orders',
            type: 'string',
            required: false,
            description: 'JSON array of order txids (orders or cl_ord_ids required)'
          },
          {
            name: 'cl_ord_ids',
            type: 'string',
            required: false,
            description: 'JSON array of client order IDs (orders or cl_ord_ids required)'
          }
        ]
      },
      {
        name: 'Get WebSockets Token',
        endpoint: 'GetWebSocketsToken',
        type: 'rest-private',
        description: 'Get authentication token for WebSocket v2',
        docsUrl: 'https://docs.kraken.com/api/docs/rest-api/get-websockets-token',
        params: []
      }
    ]
  },
  {
    name: 'WebSocket - Public',
    methods: [
      {
        name: 'Ticker',
        endpoint: 'ticker',
        type: 'ws-public',
        description: 'Subscribe to ticker updates',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/ticker',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Symbol(s) to subscribe (at least one required)'
          },
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Order Book',
        endpoint: 'book',
        type: 'ws-public',
        description: 'Subscribe to Level 2 order book',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/book',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Symbol(s) to subscribe (at least one required)'
          },
          {
            name: 'depth',
            type: 'select',
            required: false,
            description: 'Book depth',
            options: ['10', '25', '100']
          },
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'OHLC',
        endpoint: 'ohlc',
        type: 'ws-public',
        description: 'Subscribe to OHLC updates',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/ohlc',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Symbol(s) to subscribe (at least one required)'
          },
          {
            name: 'interval',
            type: 'select',
            required: true,
            description: 'Interval in minutes',
            options: ['1', '5', '15', '30', '60', '240', '1440']
          },
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Trades',
        endpoint: 'trade',
        type: 'ws-public',
        description: 'Subscribe to trades',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/trade',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Symbol(s) to subscribe (at least one required)'
          },
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Instrument',
        endpoint: 'instrument',
        type: 'ws-public',
        description: 'Subscribe to instrument (reference data)',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/instrument',
        params: [
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Status',
        endpoint: 'status',
        type: 'ws-public',
        description: 'Subscribe to exchange status updates',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/status',
        params: []
      }
    ]
  },
  {
    name: 'WebSocket - Public Actions',
    methods: [
      {
        name: 'Ping',
        endpoint: 'ping',
        type: 'ws-public-action',
        description: 'Ping server to verify connection (returns pong)',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/ping',
        params: []
      }
    ]
  },
  {
    name: 'WebSocket - Private',
    methods: [
      {
        name: 'Level 3 Book',
        endpoint: 'level3',
        type: 'ws-private',
        description: 'Subscribe to Level 3 order book (individual orders)',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/level3',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Symbol(s) to subscribe (at least one required)'
          },
          {
            name: 'depth',
            type: 'select',
            required: false,
            description: 'Book depth',
            options: ['10', '25', '100']
          },
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Balances',
        endpoint: 'balances',
        type: 'ws-private',
        description: 'Subscribe to balance updates',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/balances',
        params: [
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      },
      {
        name: 'Executions',
        endpoint: 'executions',
        type: 'ws-private',
        description: 'Subscribe to order executions and status',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/executions',
        params: [
          {
            name: 'snapshot',
            type: 'boolean',
            required: false,
            description: 'Request a snapshot after subscribing (default: true)',
            defaultValue: true
          }
        ]
      }
    ]
  },
  {
    name: 'WebSocket - Private Actions',
    methods: [
      {
        name: 'Add Order',
        endpoint: 'add_order',
        type: 'ws-private-action',
        description: 'Place a new order via WebSocket',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/add_order',
        params: [
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Trading pair (e.g., BTC/USD)'
          },
          {
            name: 'side',
            type: 'select',
            required: true,
            description: 'Order side',
            options: ['buy', 'sell']
          },
          {
            name: 'order_type',
            type: 'select',
            required: true,
            description: 'Order type',
            options: ['limit', 'market', 'stop-loss', 'take-profit', 'stop-loss-limit', 'take-profit-limit', 'trailing-stop', 'trailing-stop-limit']
          },
          {
            name: 'order_qty',
            type: 'number',
            required: true,
            description: 'Order quantity in base asset'
          },
          {
            name: 'limit_price',
            type: 'number',
            required: false,
            description: 'Limit price (required for limit orders)'
          },
          {
            name: 'time_in_force',
            type: 'select',
            required: false,
            description: 'Time in force (default: gtc)',
            options: ['gtc', 'ioc', 'gtd']
          },
          {
            name: 'post_only',
            type: 'boolean',
            required: false,
            description: 'Post-only order (maker only)'
          },
          {
            name: 'reduce_only',
            type: 'boolean',
            required: false,
            description: 'Reduce-only order'
          }
        ]
      },
      {
        name: 'Amend Order',
        endpoint: 'amend_order',
        type: 'ws-private-action',
        description: 'Amend an existing order (post-only flag, price, quantity)',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/amend_order',
        params: [
          {
            name: 'order_id',
            type: 'string',
            required: false,
            description: 'Order ID to amend (order_id or cl_order_id required)'
          },
          {
            name: 'cl_order_id',
            type: 'string',
            required: false,
            description: 'Client order ID to amend (order_id or cl_order_id required)'
          },
          {
            name: 'order_qty',
            type: 'number',
            required: false,
            description: 'New order quantity'
          },
          {
            name: 'display_qty',
            type: 'number',
            required: false,
            description: 'New display quantity (for iceberg orders)'
          },
          {
            name: 'limit_price',
            type: 'number',
            required: false,
            description: 'New limit price'
          },
          {
            name: 'limit_price_type',
            type: 'select',
            required: false,
            description: 'Price type: static, pct, or quote',
            options: ['static', 'pct', 'quote']
          },
          {
            name: 'trigger_price',
            type: 'number',
            required: false,
            description: 'New trigger price (for conditional orders)'
          },
          {
            name: 'trigger_price_type',
            type: 'select',
            required: false,
            description: 'Trigger price type: static, pct, or quote',
            options: ['static', 'pct', 'quote']
          },
          {
            name: 'post_only',
            type: 'boolean',
            required: false,
            description: 'Post-only flag'
          },
          {
            name: 'deadline',
            type: 'string',
            required: false,
            description: 'RFC3339 timestamp deadline (offset 500ms to 60s)'
          },
          {
            name: 'symbol',
            type: 'string',
            required: false,
            description: 'Symbol (required for non-crypto pairs like xstocks)'
          }
        ]
      },
      {
        name: 'Edit Order',
        endpoint: 'edit_order',
        type: 'ws-private-action',
        description: 'Modify an existing order (legacy)',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/edit_order',
        params: [
          {
            name: 'order_id',
            type: 'string',
            required: true,
            description: 'Order ID to edit'
          },
          {
            name: 'symbol',
            type: 'asset-pairs',
            required: true,
            description: 'Trading pair'
          },
          {
            name: 'order_qty',
            type: 'number',
            required: false,
            description: 'New order quantity'
          },
          {
            name: 'limit_price',
            type: 'number',
            required: false,
            description: 'New limit price'
          }
        ]
      },
      {
        name: 'Cancel Order',
        endpoint: 'cancel_order',
        type: 'ws-private-action',
        description: 'Cancel a single order',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/cancel_order',
        params: [
          {
            name: 'order_id',
            type: 'string',
            required: true,
            description: 'Order ID to cancel'
          }
        ]
      },
      {
        name: 'Cancel All Orders',
        endpoint: 'cancel_all',
        type: 'ws-private-action',
        description: 'Cancel all open orders',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/cancel_all',
        params: []
      },
      {
        name: 'Cancel All After',
        endpoint: 'cancel_all_orders_after',
        type: 'ws-private-action',
        description: 'Dead Man\'s Switch - cancel all orders after timeout',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/cancel_all_orders_after',
        params: [
          {
            name: 'timeout',
            type: 'number',
            required: true,
            description: 'Timeout in seconds (0 to disable)'
          }
        ]
      },
      {
        name: 'Batch Add Orders',
        endpoint: 'batch_add',
        type: 'ws-private-action',
        description: 'Place multiple orders at once',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/batch_add',
        params: [
          {
            name: 'orders',
            type: 'string',
            required: true,
            description: 'JSON array of order objects'
          }
        ]
      },
      {
        name: 'Batch Cancel Orders',
        endpoint: 'batch_cancel',
        type: 'ws-private-action',
        description: 'Cancel multiple orders at once',
        docsUrl: 'https://docs.kraken.com/api/docs/websocket-v2/batch_cancel',
        params: [
          {
            name: 'order_ids',
            type: 'string',
            required: true,
            description: 'Comma-separated list of order IDs'
          }
        ]
      }
    ]
  }
];
