<script lang="ts">
  import { authState } from '../stores/app-state.svelte';

  let showSettings = $state(false);
  let apiKey = $state('');
  let apiSecret = $state('');
  let showSecret = $state(false);

  // Initialize from existing credentials
  $effect(() => {
    if (authState.credentials) {
      apiKey = authState.credentials.apiKey;
      apiSecret = authState.credentials.apiSecret;
    }
  });

  function toggleSettings() {
    showSettings = !showSettings;
  }

  function handleSave() {
    if (apiKey.trim() && apiSecret.trim()) {
      authState.setCredentials(apiKey.trim(), apiSecret.trim());
      showSettings = false;
    }
  }

  function handleClear() {
    authState.clearCredentials();
    apiKey = '';
    apiSecret = '';
  }

  function toggleSecretVisibility() {
    showSecret = !showSecret;
  }
</script>

<div class="auth-settings">
  <button
    class="auth-status-btn"
    class:authenticated={authState.isAuthenticated}
    onclick={toggleSettings}
  >
    <span class="auth-icon">
      {authState.isAuthenticated ? '🔓' : '🔒'}
    </span>
    <span class="auth-text">
      {authState.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
    </span>
    <span class="auth-chevron" class:open={showSettings}>▼</span>
  </button>

  {#if showSettings}
    <div class="auth-panel">
      <div class="auth-panel-header">
        <h3>API Credentials</h3>
        <button class="close-btn" onclick={toggleSettings}>✕</button>
      </div>

      <div class="auth-panel-body">
        <div class="auth-warning">
          <div class="auth-warning-icon">⚠️</div>
          <div class="auth-warning-text">
            Credentials are stored in session storage only and will be cleared when you close the browser.
            Never commit or share your API keys.
          </div>
        </div>

        <div class="form-group">
          <label class="label" for="api-key">API Key</label>
          <input
            id="api-key"
            type="text"
            class="input"
            placeholder="Enter your Kraken API key"
            bind:value={apiKey}
          />
        </div>

        <div class="form-group">
          <label class="label" for="api-secret">API Secret</label>
          <div class="input-with-toggle">
            <input
              id="api-secret"
              type={showSecret ? 'text' : 'password'}
              class="input"
              placeholder="Enter your Kraken API secret"
              bind:value={apiSecret}
            />
            <button
              class="toggle-visibility-btn"
              onclick={toggleSecretVisibility}
              type="button"
            >
              {showSecret ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div class="auth-panel-actions">
          <button
            class="btn btn-primary"
            onclick={handleSave}
            disabled={!apiKey.trim() || !apiSecret.trim()}
          >
            Save Credentials
          </button>
          {#if authState.isAuthenticated}
            <button class="btn btn-danger" onclick={handleClear}>
              Clear Credentials
            </button>
          {/if}
        </div>

        <div class="auth-help">
          <p>
            Get your API credentials from
            <a href="https://www.kraken.com/u/security/api" target="_blank" rel="noopener">
              Kraken Security Settings
            </a>
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .auth-settings {
    position: relative;
  }

  .auth-status-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: 13px;
    cursor: pointer;
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-hover);
      border-color: var(--color-border-active);
    }

    &.authenticated {
      border-color: var(--color-success);
      background: rgba(63, 185, 80, 0.1);

      .auth-text {
        color: var(--color-success);
        font-weight: 500;
      }
    }
  }

  .auth-icon {
    font-size: 14px;
  }

  .auth-chevron {
    font-size: 8px;
    color: var(--color-text-muted);
    margin-left: var(--spacing-xs);
    transition: transform var(--transition);

    &.open {
      transform: rotate(180deg);
    }
  }

  .auth-panel {
    position: absolute;
    top: calc(100% + var(--spacing-sm));
    right: 0;
    width: 400px;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }

  .auth-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);

    h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-hover);
      color: var(--color-text-primary);
    }
  }

  .auth-panel-body {
    padding: var(--spacing-md);
  }

  .auth-warning {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    background: rgba(210, 153, 34, 0.1);
    border: 1px solid var(--color-warning);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-md);
  }

  .auth-warning-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  .auth-warning-text {
    font-size: 12px;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }

  .input-with-toggle {
    position: relative;

    .input {
      padding-right: 40px;
    }
  }

  .toggle-visibility-btn {
    position: absolute;
    right: var(--spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    opacity: 0.6;
    transition: opacity var(--transition);

    &:hover {
      opacity: 1;
    }
  }

  .auth-panel-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }

  .auth-help {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);

    p {
      font-size: 12px;
      color: var(--color-text-muted);
      margin: 0;
    }

    a {
      color: var(--color-accent);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
