<script lang="ts">
  import { methodCategories } from '../method-definitions';
  import { methodState, terminalState, authState, wsState, assetPairsState, assetsState } from '../stores/app-state.svelte';
  import { krakenClient } from '../kraken-client';
  import type { MethodDefinition, WebSocketSubscription } from '../../types/ui-types';
  import SelectAssetOrPair from './SelectAssetOrPair.svelte';
  import SelectAssetOrPairList from './SelectAssetOrPairList.svelte';
  import Toggle from './Toggle.svelte';

  let loading = $state(false);
  let showJsonPreview = $state(false);

  const selectedMethodDef = $derived.by(() => {
    if (!methodState.selectedMethod || !methodState.selectedMethodType) return null;
    for (const category of methodCategories) {
      const method = category.methods.find(
        m => m.name === methodState.selectedMethod && m.type === methodState.selectedMethodType
      );
      if (method) return method;
    }
    return null;
  });

  const isWebSocketMethod = $derived(
    selectedMethodDef?.type === 'ws-public' || selectedMethodDef?.type === 'ws-private'
  );

  const isWebSocketAction = $derived(
    selectedMethodDef?.type === 'ws-private-action' || selectedMethodDef?.type === 'ws-public-action'
  );

  const activeWsSubscription = $derived.by(() => {
    if (!selectedMethodDef || !isWebSocketMethod) return null;
    return wsState.activeSubscriptions.find(sub => sub.methodName === selectedMethodDef.name);
  });

  // Check if snapshot param is enabled (check formData or default value)
  const isSnapshotEnabled = $derived.by(() => {
    if (!isWebSocketMethod || !selectedMethodDef) return false;

    const snapshotParam = selectedMethodDef.params?.find(p => p.name === 'snapshot');
    if (!snapshotParam) return false;

    // Check formData first, then fall back to default value
    const formValue = methodState.formData['snapshot'];
    if (formValue !== undefined) {
      return formValue === true;
    }

    // Use default value if formData not set
    return snapshotParam.defaultValue === true;
  });

  // Check if all required params are filled
  const hasRequiredParams = $derived.by(() => {
    if (!selectedMethodDef || !selectedMethodDef.params) return true;

    return selectedMethodDef.params.every(param => {
      if (!param.required) return true;

      const value = methodState.formData[param.name];
      // Check if value exists and is not empty
      if (value === undefined || value === null || value === '') return false;

      // For string values, also check trimmed length
      if (typeof value === 'string' && value.trim() === '') return false;

      return true;
    });
  });

  const jsonPreview = $derived.by(() => {
    if (!selectedMethodDef) return '{}';
    const params: Record<string, unknown> = {};
    selectedMethodDef.params?.forEach(param => {
      const value = methodState.formData[param.name];
      if (value !== undefined && value !== null && value !== '') {
        params[param.name] = value;
      }
    });
    return JSON.stringify(params, null, 2);
  });

  async function handleExecute() {
    if (!selectedMethodDef || isWebSocketMethod || isWebSocketAction) return;

    loading = true;

    // Update singleton client credentials if needed
    if (authState.credentials) {
      krakenClient.setCredentials(authState.credentials);
    }

    try {
      terminalState.addLog('info', `Executing ${selectedMethodDef.name}...`);

      // Build params object - normalization happens automatically in KrakenClient
      const params: Record<string, unknown> = {};
      selectedMethodDef.params?.forEach(param => {
        const value = methodState.formData[param.name];
        if (value !== undefined && value !== null && value !== '') {
          params[param.name] = value;
        }
      });

      let result: unknown;

      // Execute REST requests
      if (selectedMethodDef.type === 'rest-public') {
        result = await krakenClient.publicRest(selectedMethodDef.endpoint as any, params);
      } else if (selectedMethodDef.type === 'rest-private') {
        result = await krakenClient.privateRest(selectedMethodDef.endpoint as any, params);
      }

      terminalState.addLog('success', `${selectedMethodDef.name} completed successfully`, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalState.addLog('error', `${selectedMethodDef.name} failed: ${errorMessage}`);
    } finally {
      loading = false;
    }
  }

  async function handleSnapshot() {
    if (!selectedMethodDef || !isWebSocketMethod) return;

    loading = true;

    // Update singleton client credentials if needed
    if (authState.credentials) {
      krakenClient.setCredentials(authState.credentials);
    }

    try {
      terminalState.addLog('info', `Requesting snapshot from ${selectedMethodDef.name}...`);

      // Build params object
      const params: Record<string, unknown> = {};
      selectedMethodDef.params?.forEach(param => {
        const value = methodState.formData[param.name];
        if (value !== undefined && value !== null && value !== '') {
          // Convert symbol/pair to array format for WebSocket API
          if (param.name === 'symbol' && typeof value === 'string') {
            // WebSocket API needs pairs with / separator (e.g., BTC/USD not XBTUSD)
            params[param.name] = value.split(',').map(s => s.trim());
          } else {
            params[param.name] = value;
          }
        }
      });

      let result: unknown;

      // Execute WebSocket snapshot (auto-closes after first message)
      if (selectedMethodDef.type === 'ws-public') {
        result = await krakenClient.snapshotPublic(selectedMethodDef.endpoint as any, params);
      } else if (selectedMethodDef.type === 'ws-private') {
        result = await krakenClient.snapshotPrivate(selectedMethodDef.endpoint as any, params);
      }

      terminalState.addLog('success', `Snapshot received from ${selectedMethodDef.endpoint}`, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalState.addLog('error', `${selectedMethodDef.name} snapshot failed: ${errorMessage}`);
    } finally {
      loading = false;
    }
  }

  async function handleSubscribe() {
    if (!selectedMethodDef || !isWebSocketMethod) return;

    // Update singleton client credentials if needed
    if (authState.credentials) {
      krakenClient.setCredentials(authState.credentials);
    }

    try {
      terminalState.addLog('info', `Subscribing to ${selectedMethodDef.name}...`);

      // Build params object
      const params: Record<string, unknown> = {};
      selectedMethodDef.params?.forEach(param => {
        const value = methodState.formData[param.name];
        if (value !== undefined && value !== null && value !== '') {
          // Convert symbol/pair to array format for WebSocket API
          if (param.name === 'symbol' && typeof value === 'string') {
            params[param.name] = value.split(',').map(s => s.trim());
          } else {
            params[param.name] = value;
          }
        }
      });

      console.log('WebSocket params:', params);

      // Create subscription that outputs to terminal
      const onMessage = (data: any) => {
        console.log('WebSocket message received:', data);
        terminalState.addLog('info', `[${selectedMethodDef.endpoint}] Update`, data);
      };

      const onError = (error: any) => {
        console.error('WebSocket error:', error);
        terminalState.addLog('error', `[${selectedMethodDef.endpoint}] Error: ${error.message || String(error)}`);
      };

      let subscription;
      if (selectedMethodDef.type === 'ws-public') {
        subscription = krakenClient.listenPublic(selectedMethodDef.endpoint as any, params, onMessage, onError);
      } else if (selectedMethodDef.type === 'ws-private') {
        subscription = await krakenClient.listenPrivate(selectedMethodDef.endpoint as any, params, onMessage, onError);
      }

      if (subscription) {
        const wsSubscription: WebSocketSubscription = {
          id: crypto.randomUUID(),
          methodName: selectedMethodDef.name,
          endpoint: selectedMethodDef.endpoint,
          params,
          subscription,
          mode: 'listen'
        };

        wsState.addSubscription(wsSubscription);
        console.log('Added subscription to state:', wsSubscription.id, 'Total subscriptions:', wsState.activeSubscriptions.length);
        terminalState.addLog('success', `Subscribed to ${selectedMethodDef.endpoint}. Updates will appear below.`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalState.addLog('error', `${selectedMethodDef.name} subscribe failed: ${errorMessage}`);
    }
  }

  function handleStopListening() {
    if (!selectedMethodDef || !activeWsSubscription) return;

    wsState.removeSubscription(activeWsSubscription.id);
    terminalState.addLog('info', `Stopped listening to ${selectedMethodDef.endpoint}`);
  }

  async function handleWsAction() {
    if (!selectedMethodDef || !isWebSocketAction) return;

    loading = true;

    // Update singleton client credentials if needed
    if (authState.credentials) {
      krakenClient.setCredentials(authState.credentials);
    }

    try {
      terminalState.addLog('info', `Executing ${selectedMethodDef.name}...`);

      // Build params object
      const params: Record<string, unknown> = {};
      selectedMethodDef.params?.forEach(param => {
        const value = methodState.formData[param.name];
        if (value !== undefined && value !== null && value !== '') {
          params[param.name] = value;
        }
      });

      let result;

      // Execute public or private WebSocket action
      if (selectedMethodDef.type === 'ws-public-action') {
        // Public action (e.g., ping)
        result = await krakenClient.publicWsAction(
          selectedMethodDef.endpoint as 'ping',
          params.req_id as number | undefined
        );
      } else {
        // Private action
        result = await krakenClient.privateWsAction({
          method: selectedMethodDef.endpoint,
          params,
          req_id: Date.now()
        } as any);
      }

      terminalState.addLog('success', `${selectedMethodDef.name} completed successfully`, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalState.addLog('error', `${selectedMethodDef.name} failed: ${errorMessage}`);
    } finally {
      loading = false;
    }
  }

  function handleClear() {
    methodState.clearForm();
  }

  function handleFieldChange(fieldName: string, value: unknown) {
    methodState.updateFormField(fieldName, value);
  }

  function toggleJsonPreview() {
    showJsonPreview = !showJsonPreview;
  }
</script>

<div class="method-form">
  {#if selectedMethodDef}
    <div class="method-header">
      <div class="method-title-section">
        <h2 class="method-title">{selectedMethodDef.name}</h2>
        <span class="method-badge" class:private={selectedMethodDef.type.includes('private') || selectedMethodDef.type === 'ws-private-action'}>
          {selectedMethodDef.type.toUpperCase()}
        </span>
        {#if selectedMethodDef.docsUrl}
          <a href={selectedMethodDef.docsUrl} target="_blank" rel="noopener noreferrer" class="docs-link" title="View official documentation">
            📖 Docs
          </a>
        {/if}
      </div>
      <p class="method-description">{selectedMethodDef.description}</p>
      <div class="method-endpoint">
        <code>{selectedMethodDef.endpoint}</code>
      </div>
    </div>

    <div class="method-body">
      {#if selectedMethodDef.params && selectedMethodDef.params.length > 0}
        <div class="params-section">
          <h3 class="section-title">Parameters</h3>

          <div class="params-grid">
            {#each selectedMethodDef.params as param}
              <div class="form-group">
              <label class="label" for={param.name}>
                {param.name}
                {#if param.required}
                  <span class="required">*</span>
                {/if}
              </label>

              {#if param.description}
                <div class="param-description">{param.description}</div>
              {/if}

              {#if param.type === 'asset-pairs' && assetPairsState.pairs.length > 0}
                <SelectAssetOrPairList
                  items={assetPairsState.pairs}
                  value={(methodState.formData[param.name] as string) || ''}
                  onchange={(value) => handleFieldChange(param.name, value)}
                  id={param.name}
                  placeholder="Type to add pairs..."
                />
              {:else if param.type === 'assets' && assetsState.assets.length > 0}
                <SelectAssetOrPairList
                  items={assetsState.assets}
                  value={(methodState.formData[param.name] as string) || ''}
                  onchange={(value) => handleFieldChange(param.name, value)}
                  id={param.name}
                  placeholder="Type to add assets..."
                />
              {:else if param.type === 'asset' && assetsState.assets.length > 0}
                <SelectAssetOrPair
                  items={assetsState.assets}
                  value={(methodState.formData[param.name] as string) || ''}
                  onchange={(value) => handleFieldChange(param.name, value)}
                  id={param.name}
                  placeholder="Select an asset..."
                />
              {:else if param.type === 'select' && param.options}
                <select
                  id={param.name}
                  class="select"
                  value={methodState.formData[param.name] as string || ''}
                  onchange={(e) => handleFieldChange(param.name, e.currentTarget.value)}
                >
                  <option value="">Select {param.name}...</option>
                  {#each param.options as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else if (param.name === 'pair' || param.name === 'symbol') && assetPairsState.pairs.length > 0}
                <!-- Check if param description mentions comma-delimited or multiple -->
                {@const isMultiSelect = param.description?.toLowerCase().includes('comma') || param.description?.toLowerCase().includes('multiple') || isWebSocketMethod}

                {#if isMultiSelect}
                  <SelectAssetOrPairList
                    items={assetPairsState.pairs}
                    value={(methodState.formData[param.name] as string) || ''}
                    onchange={(value) => handleFieldChange(param.name, value)}
                    id={param.name}
                    placeholder="Type to add pairs..."
                  />
                {:else}
                  <SelectAssetOrPair
                    items={assetPairsState.pairs}
                    value={(methodState.formData[param.name] as string) || ''}
                    onchange={(value) => handleFieldChange(param.name, value)}
                    id={param.name}
                    placeholder="Select a pair..."
                  />
                {/if}
              {:else if param.type === 'boolean'}
                {@const defaultChecked = param.defaultValue !== undefined ? param.defaultValue : false}
                {@const isChecked = methodState.formData[param.name] !== undefined ? (methodState.formData[param.name] as boolean) : (defaultChecked as boolean)}
                <Toggle
                  id={param.name}
                  checked={isChecked}
                  onchange={(checked) => handleFieldChange(param.name, checked)}
                  label="Enable {param.name}"
                />
              {:else if param.type === 'number'}
                <input
                  id={param.name}
                  type="number"
                  class="input"
                  placeholder="Enter {param.name}"
                  value={methodState.formData[param.name] as number || ''}
                  oninput={(e) => handleFieldChange(param.name, parseFloat(e.currentTarget.value))}
                />
              {:else}
                <input
                  id={param.name}
                  type="text"
                  class="input"
                  placeholder="Enter {param.name}"
                  value={methodState.formData[param.name] as string || ''}
                  oninput={(e) => handleFieldChange(param.name, e.currentTarget.value)}
                />
              {/if}
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="no-params">
          <span class="no-params-icon">✓</span>
          This method requires no parameters
        </div>
      {/if}

      <div class="json-preview-section">
        <button class="btn btn-sm" onclick={toggleJsonPreview}>
          {showJsonPreview ? '▼' : '▶'} JSON Preview
        </button>

        {#if showJsonPreview}
          <pre class="code-block">{jsonPreview}</pre>
        {/if}
      </div>

      <div class="method-actions">
        {#if isWebSocketMethod}
          <!-- WebSocket subscription buttons -->
          {#if isSnapshotEnabled}
            <button
              class="btn btn-primary"
              onclick={handleSnapshot}
              disabled={loading || !!activeWsSubscription || !hasRequiredParams}
            >
              {loading ? 'Requesting...' : 'Request Snapshot'}
            </button>
          {/if}
          {#if activeWsSubscription}
            <button
              class="btn btn-danger"
              onclick={handleStopListening}
            >
              Stop Listening
            </button>
          {:else}
            <button
              class="btn btn-success"
              onclick={handleSubscribe}
              disabled={loading || !hasRequiredParams}
            >
              Subscribe
            </button>
          {/if}
        {:else if isWebSocketAction}
          <!-- WebSocket action buttons -->
          <button
            class="btn btn-primary"
            onclick={handleWsAction}
            disabled={loading || !hasRequiredParams}
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        {:else}
          <!-- REST method buttons -->
          <button
            class="btn btn-primary"
            onclick={handleExecute}
            disabled={loading || !hasRequiredParams}
          >
            {loading ? 'Executing...' : 'Execute'}
          </button>
        {/if}
        <button
          class="btn"
          onclick={handleClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .method-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .method-header {
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--spacing-lg);
  }

  .method-title-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
  }

  .method-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  .method-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.private {
      background: rgba(88, 166, 255, 0.2);
      color: var(--color-accent);
    }
  }

  .docs-link {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 4px;
    background: var(--color-success);
    color: white;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover {
      background: #0d8043;
      transform: translateY(-1px);
    }
  }

  .method-description {
    color: var(--color-text-secondary);
    margin: 0 0 var(--spacing-sm) 0;
    font-size: 14px;
  }

  .method-endpoint {
    code {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--color-accent);
      background: var(--color-bg-tertiary);
      padding: 4px 8px;
      border-radius: 4px;
    }
  }

  .method-body {
    flex: 1;
    overflow-y: auto;
    padding-right: var(--spacing-md);
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .params-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .param-description {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xs);
  }

  .required {
    color: var(--color-error);
    margin-left: 2px;
  }

  .no-params {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text-secondary);
    font-size: 13px;
  }

  .no-params-icon {
    color: var(--color-success);
    font-size: 16px;
  }

  .json-preview-section {
    margin: var(--spacing-lg) 0;
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border);

    .code-block {
      margin-top: var(--spacing-md);
    }
  }

  .method-actions {
    display: flex;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
  }

  .btn-success {
    background: var(--color-success);
    color: white;

    &:hover:not(:disabled) {
      background: #0d8043;
    }
  }

  .btn-danger {
    background: var(--color-error);
    color: white;

    &:hover:not(:disabled) {
      background: #c41e3a;
    }
  }
</style>
