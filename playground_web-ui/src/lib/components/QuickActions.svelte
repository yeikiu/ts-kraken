<script lang="ts">
  import { authState, terminalState, methodState, assetPairsState } from '../stores/app-state.svelte';
  import { KrakenClient } from '../kraken-client';
  import SelectAssetOrPair from './SelectAssetOrPair.svelte';

  interface QuickActionDef {
    id: string;
    icon: string;
    label: string;
    description: string;
    category: 'trading' | 'monitoring' | 'management';
    requiresAuth: boolean;
    requiresPair?: boolean;
    action: () => Promise<void>;
  }

  let loading = $state<string | null>(null);
  let showPairInput = $state(false);
  let selectedPair = $state('');
  let buyAmount = $state('100');

  // Track heartbeat monitoring state
  let publicHeartbeatSub = $state<any>(null);
  let privateHeartbeatSub = $state<any>(null);

  const quickActions = $derived<QuickActionDef[]>([
    // Monitoring
    {
      id: 'show-balances',
      icon: '💰',
      label: 'Show Balances',
      description: 'Display account balances',
      category: 'monitoring',
      requiresAuth: true,
      action: async () => {
        const client = new KrakenClient(authState.credentials!);
        terminalState.addLog('info', 'Fetching account balances...');
        const result = await client.privateRest('Balance');
        terminalState.addLog('success', 'Account balances', result);
      }
    },
    {
      id: 'show-open-orders',
      icon: '📊',
      label: 'Show Open Orders',
      description: 'List all open orders',
      category: 'monitoring',
      requiresAuth: true,
      action: async () => {
        const client = new KrakenClient(authState.credentials!);
        terminalState.addLog('info', 'Fetching open orders...');
        const result = await client.privateRest('OpenOrders');
        terminalState.addLog('success', 'Open orders', result);
      }
    },
    {
      id: 'recent-trades',
      icon: '📜',
      label: 'Recent Trades',
      description: 'Show recent trade history',
      category: 'monitoring',
      requiresAuth: true,
      action: async () => {
        const client = new KrakenClient(authState.credentials!);
        terminalState.addLog('info', 'Fetching recent trades...');
        const result = await client.privateRest('TradesHistory', { count: 10 } as any);
        terminalState.addLog('success', 'Recent trades', result);
      }
    },
    {
      id: 'price-ticker',
      icon: '📈',
      label: selectedPair ? 'Price Ticker' : 'All Price Tickers',
      description: selectedPair ? `Get current price for ${selectedPair}` : 'Get prices for all pairs',
      category: 'monitoring',
      requiresAuth: false,
      action: async () => {
        const client = new KrakenClient();
        if (selectedPair) {
          terminalState.addLog('info', `Fetching ticker for ${selectedPair}...`);
          const result = await client.publicRest('Ticker', { pair: selectedPair });
          terminalState.addLog('success', `Ticker for ${selectedPair}`, result);
        } else {
          terminalState.addLog('info', 'Fetching tickers for all pairs...');
          const result = await client.publicRest('Ticker', {});
          terminalState.addLog('success', 'All tickers', result);
        }
      }
    },
    // Trading
    {
      id: 'sell-all-market',
      icon: '🔴',
      label: 'Sell All to Market',
      description: 'Quick market sell (requires pair)',
      category: 'trading',
      requiresAuth: true,
      requiresPair: true,
      action: async () => {
        if (!confirm(`Are you sure you want to sell ALL ${selectedPair} at market price?`)) {
          return;
        }
        terminalState.addLog('warning', 'Sell all feature requires implementation with balance check');
        // Implementation would:
        // 1. Get balance for the pair
        // 2. Create market sell order for full balance
      }
    },
    {
      id: 'buy-with-usdt',
      icon: '🟢',
      label: 'Quick Buy',
      description: `Buy with ${buyAmount} USDT`,
      category: 'trading',
      requiresAuth: true,
      requiresPair: true,
      action: async () => {
        if (!confirm(`Buy ${selectedPair} with ${buyAmount} USDT at market price?`)) {
          return;
        }
        terminalState.addLog('warning', 'Quick buy feature requires implementation with volume calculation');
        // Implementation would calculate volume based on current price
      }
    },
    {
      id: 'quick-limit',
      icon: '⚡',
      label: 'Quick Limit Order',
      description: 'Place limit order at current ±0.5%',
      category: 'trading',
      requiresAuth: true,
      requiresPair: true,
      action: async () => {
        methodState.setMethod('Add Order', 'rest-private');
        if (selectedPair) {
          methodState.updateFormField('pair', selectedPair);
        }
        terminalState.addLog('info', 'Opening Add Order form for quick limit order');
      }
    },
    // Management
    {
      id: 'cancel-all',
      icon: '❌',
      label: 'Cancel All Orders',
      description: 'Cancel all open orders',
      category: 'management',
      requiresAuth: true,
      action: async () => {
        if (!confirm('Are you sure you want to cancel ALL open orders?')) {
          return;
        }
        const client = new KrakenClient(authState.credentials!);
        terminalState.addLog('warning', 'Cancelling all open orders...');
        const result = await client.privateRest('CancelAll');
        terminalState.addLog('success', 'All orders cancelled', result);
      }
    },
    {
      id: 'cancel-timer',
      icon: '⏱️',
      label: 'Set Cancel Timer',
      description: 'Cancel all after 60 seconds',
      category: 'management',
      requiresAuth: true,
      action: async () => {
        const client = new KrakenClient(authState.credentials!);
        terminalState.addLog('info', 'Setting cancel timer to 60 seconds...');
        const result = await client.privateRest('CancelAllOrdersAfter', { timeout: 60 });
        terminalState.addLog('success', 'Cancel timer set', result);
      }
    },
    {
      id: 'order-book',
      icon: '📖',
      label: 'Order Book',
      description: 'View current order book',
      category: 'monitoring',
      requiresAuth: false,
      requiresPair: true,
      action: async () => {
        const client = new KrakenClient();
        terminalState.addLog('info', `Fetching order book for ${selectedPair}...`);
        const result = await client.publicRest('Depth', { pair: selectedPair, count: 10 });
        terminalState.addLog('success', `Order book for ${selectedPair}`, result);
      }
    },
    {
      id: 'server-time',
      icon: '🕐',
      label: 'Server Time',
      description: 'Get Kraken server time',
      category: 'monitoring',
      requiresAuth: false,
      action: async () => {
        const client = new KrakenClient();
        terminalState.addLog('info', 'Fetching server time...');
        const result = await client.publicRest('Time');
        terminalState.addLog('success', 'Server time', result);
      }
    },
    {
      id: 'monitor-public-heartbeat',
      icon: publicHeartbeatSub ? '🔴' : '💓',
      label: publicHeartbeatSub ? 'Stop Public Heartbeat' : 'Monitor Public Heartbeat',
      description: publicHeartbeatSub ? 'Stop monitoring public heartbeats' : 'Listen to public WebSocket heartbeats (~1/sec)',
      category: 'monitoring',
      requiresAuth: false,
      action: async () => {
        if (publicHeartbeatSub) {
          // Stop monitoring
          publicHeartbeatSub.unsubscribe();
          publicHeartbeatSub = null;
          terminalState.addLog('info', 'Stopped public heartbeat monitoring');
        } else {
          // Start monitoring
          const client = new KrakenClient();
          terminalState.addLog('info', 'Starting public heartbeat monitor... (requires active subscription)');
          publicHeartbeatSub = client.listenPublicHeartbeat(
            (data) => {
              terminalState.addLog('info', 'Public heartbeat received', data);
            },
            (error) => {
              terminalState.addLog('error', 'Public heartbeat error', error);
            }
          );
          terminalState.addLog('success', 'Public heartbeat monitor started. Subscribe to any public channel to see heartbeats.');
        }
      }
    },
    {
      id: 'monitor-private-heartbeat',
      icon: privateHeartbeatSub ? '🔴' : '💗',
      label: privateHeartbeatSub ? 'Stop Private Heartbeat' : 'Monitor Private Heartbeat',
      description: privateHeartbeatSub ? 'Stop monitoring private heartbeats' : 'Listen to private WebSocket heartbeats (~1/sec)',
      category: 'monitoring',
      requiresAuth: true,
      action: async () => {
        if (privateHeartbeatSub) {
          // Stop monitoring
          privateHeartbeatSub.unsubscribe();
          privateHeartbeatSub = null;
          terminalState.addLog('info', 'Stopped private heartbeat monitoring');
        } else {
          // Start monitoring
          const client = new KrakenClient(authState.credentials!);
          terminalState.addLog('info', 'Starting private heartbeat monitor... (requires active subscription)');
          privateHeartbeatSub = client.listenPrivateHeartbeat(
            (data) => {
              terminalState.addLog('info', 'Private heartbeat received', data);
            },
            (error) => {
              terminalState.addLog('error', 'Private heartbeat error', error);
            }
          );
          terminalState.addLog('success', 'Private heartbeat monitor started. Subscribe to any private channel to see heartbeats.');
        }
      }
    }
  ]);

  const filteredActions = $derived.by(() => {
    if (authState.isAuthenticated) {
      return quickActions;
    }
    return quickActions.filter(action => !action.requiresAuth);
  });

  const groupedActions = $derived.by(() => {
    const groups = {
      monitoring: [] as QuickActionDef[],
      trading: [] as QuickActionDef[],
      management: [] as QuickActionDef[]
    };

    filteredActions.forEach(action => {
      groups[action.category].push(action);
    });

    return groups;
  });

  async function handleAction(action: QuickActionDef) {
    if (loading) return;

    try {
      loading = action.id;
      await action.action();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalState.addLog('error', `Action failed: ${errorMessage}`);
    } finally {
      loading = null;
    }
  }
</script>

<div class="quick-actions">
  <div class="quick-actions-header">
    <h2>Quick Actions</h2>
    <div class="quick-actions-pair">
      <SelectAssetOrPair
        items={assetPairsState.pairs}
        value={selectedPair}
        onchange={(value) => selectedPair = value}
        placeholder="Select a pair..."
      />
    </div>
  </div>

  {#if !authState.isAuthenticated}
    <div class="auth-notice">
      <div class="auth-notice-icon">🔒</div>
      <div class="auth-notice-text">
        Some quick actions require authentication. Configure your API credentials to unlock all features.
      </div>
    </div>
  {/if}

  {#each Object.entries(groupedActions) as [category, actions]}
    {#if actions.length > 0}
      <div class="action-category">
        <h3 class="category-title">{category}</h3>
        <div class="quick-actions-grid">
          {#each actions as action}
            {@const isDisabled = loading !== null || (action.requiresPair && !selectedPair)}
            <button
              class="quick-action-btn"
              onclick={() => handleAction(action)}
              disabled={isDisabled}
            >
              <div class="icon">{action.icon}</div>
              <div class="label">{action.label}</div>
              <div class="description">{action.description}</div>
              {#if loading === action.id}
                <div class="action-loading">Loading...</div>
              {:else if action.requiresPair && !selectedPair}
                <div class="action-disabled-hint">Select a pair first</div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .quick-actions {
    padding-bottom: var(--spacing-lg);
  }

  .quick-actions-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--spacing-lg) 0;

    h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }
  }

  .quick-actions-pair {
    width: 250px;
  }

  .auth-notice {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(88, 166, 255, 0.1);
    border: 1px solid var(--color-accent);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-lg);
  }

  .auth-notice-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .auth-notice-text {
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .action-category {
    margin-bottom: var(--spacing-xl);
  }

  .category-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-md);
  }

  .quick-action-btn {
    position: relative;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .action-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 14, 20, 0.9);
    border-radius: var(--border-radius);
    font-size: 12px;
    color: var(--color-accent);
  }

  .action-disabled-hint {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 14, 20, 0.85);
    border-radius: var(--border-radius);
    font-size: 11px;
    color: var(--color-text-muted);
    font-style: italic;
  }
</style>
