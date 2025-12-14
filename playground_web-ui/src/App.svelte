<script lang="ts">
  import { onMount } from 'svelte';
  import Sidebar from './lib/components/Sidebar.svelte';
  import Terminal from './lib/components/Terminal.svelte';
  import AuthSettings from './lib/components/AuthSettings.svelte';
  import MethodForm from './lib/components/MethodForm.svelte';
  import QuickActions from './lib/components/QuickActions.svelte';
  import { methodState, assetPairsState, assetsState } from './lib/stores/app-state.svelte';

  const showQuickActions = $derived(!methodState.selectedMethod || methodState.selectedMethod === '');

  // Terminal resize state
  let terminalHeight = $state(300);
  let isDragging = $state(false);
  let mainElement: HTMLElement;

  function handleSeparatorMouseDown(e: MouseEvent) {
    isDragging = true;
    e.preventDefault();
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !mainElement) return;

    const rect = mainElement.getBoundingClientRect();
    const newHeight = rect.bottom - e.clientY;

    // Set min/max bounds for terminal height
    if (newHeight >= 100 && newHeight <= rect.height - 100) {
      terminalHeight = newHeight;
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!mainElement) return;

    // Allow resizing with arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      terminalHeight = Math.min(terminalHeight + 10, mainElement.offsetHeight - 100);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      terminalHeight = Math.max(terminalHeight - 10, 100);
    }
  }

  onMount(() => {
    // Fetch asset pairs and assets on initial load
    assetPairsState.fetchPairs();
    assetsState.fetchAssets();

    // Add global mouse event listeners for dragging
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<div class="app-container">
  <header class="app-header">
    <h1>
      <span>ts-kraken</span> API Playground
    </h1>
    <AuthSettings />
  </header>

  <aside class="app-sidebar">
    <Sidebar />
  </aside>

  <main class="app-main" bind:this={mainElement}>
    <div class="app-content" style="height: calc(100% - {terminalHeight}px - 5px);">
      {#if showQuickActions}
        <QuickActions />
      {:else}
        <MethodForm />
      {/if}
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="resize-separator"
      class:dragging={isDragging}
      onmousedown={handleSeparatorMouseDown}
      onkeydown={handleKeyDown}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Resize terminal"
      aria-valuenow={terminalHeight}
      aria-valuemin={100}
      aria-valuemax={1000}
      tabindex="0"
    >
      <div class="separator-handle"></div>
    </div>

    <div class="app-terminal" style="height: {terminalHeight}px;">
      <Terminal />
    </div>
  </main>
</div>
