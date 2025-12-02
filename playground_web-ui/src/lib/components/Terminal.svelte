<script lang="ts">
  import { terminalState } from '../stores/app-state.svelte';

  let terminalEl: HTMLDivElement;
  let autoScroll = $state(true);

  // Auto-scroll to bottom when new logs arrive
  $effect(() => {
    if (autoScroll && terminalEl && terminalState.logs.length > 0) {
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }
  });

  function formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  }

  function formatData(data: unknown): string {
    if (data === undefined) return '';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }

  function getLevelClass(level: string): string {
    return `text-${level}`;
  }

  function handleClear() {
    terminalState.clear();
  }

  function handleExport() {
    const data = terminalState.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kraken-terminal-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="terminal">
  <div class="terminal-header">
    <div class="terminal-title">
      <span class="terminal-icon">▶</span>
      Terminal Output
      {#if terminalState.logs.length > 0}
        <span class="terminal-count">({terminalState.logs.length})</span>
      {/if}
    </div>
    <div class="terminal-actions">
      <label class="checkbox-wrapper">
        <input type="checkbox" bind:checked={autoScroll} />
        <span>Auto-scroll</span>
      </label>
      <button class="btn btn-sm" onclick={handleExport} disabled={terminalState.logs.length === 0}>
        Export
      </button>
      <button class="btn btn-sm" onclick={handleClear} disabled={terminalState.logs.length === 0}>
        Clear
      </button>
    </div>
  </div>

  <div class="terminal-body" bind:this={terminalEl}>
    {#if terminalState.logs.length === 0}
      <div class="terminal-empty">
        <div class="terminal-empty-icon">📡</div>
        <div class="terminal-empty-text">No output yet. Try executing an API method.</div>
      </div>
    {:else}
      {#each terminalState.logs as log (log.id)}
        <div class="terminal-entry {getLevelClass(log.level)}">
          <span class="terminal-timestamp">[{formatTimestamp(log.timestamp)}]</span>
          <span class="terminal-level">{log.level.toUpperCase()}</span>
          <span class="terminal-message">{log.message}</span>
          {#if log.data !== undefined}
            <pre class="terminal-data">{formatData(log.data)}</pre>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .terminal {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--color-bg-secondary);
  }

  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-tertiary);
    border-bottom: 1px solid var(--color-border);
  }

  .terminal-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 500;
    font-size: 13px;
  }

  .terminal-icon {
    color: var(--color-accent);
    font-size: 10px;
  }

  .terminal-count {
    color: var(--color-text-muted);
    font-size: 12px;
  }

  .terminal-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    .checkbox-wrapper {
      margin: 0;

      span {
        font-size: 12px;
        color: var(--color-text-secondary);
      }
    }
  }

  .terminal-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-sm);
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.6;
  }

  .terminal-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-muted);
  }

  .terminal-empty-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
    opacity: 0.5;
  }

  .terminal-empty-text {
    font-size: 13px;
  }

  .terminal-entry {
    margin-bottom: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-left: 2px solid var(--color-border);
    border-radius: 2px;

    &.text-success {
      border-left-color: var(--color-success);
    }

    &.text-error {
      border-left-color: var(--color-error);
    }

    &.text-warning {
      border-left-color: var(--color-warning);
    }

    &.text-info {
      border-left-color: var(--color-info);
    }
  }

  .terminal-timestamp {
    color: var(--color-text-muted);
    margin-right: var(--spacing-sm);
  }

  .terminal-level {
    font-weight: 600;
    margin-right: var(--spacing-sm);
    font-size: 11px;

    .text-success & {
      color: var(--color-success);
    }

    .text-error & {
      color: var(--color-error);
    }

    .text-warning & {
      color: var(--color-warning);
    }

    .text-info & {
      color: var(--color-info);
    }
  }

  .terminal-message {
    color: var(--color-text-primary);
  }

  .terminal-data {
    margin-top: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow-x: auto;
    font-size: 11px;
    color: var(--color-text-secondary);
  }
</style>
