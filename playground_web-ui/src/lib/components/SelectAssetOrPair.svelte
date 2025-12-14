<script lang="ts">
  interface Props {
    items: string[];
    value?: string;
    onchange?: (value: string) => void;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
  }

  let {
    items,
    value = '',
    onchange,
    id,
    disabled = false,
    placeholder = 'Select...'
  }: Props = $props();

  let internalValue = $state(value);

  let filterText = $state('');
  let showDropdown = $state(false);
  let selectRef: HTMLButtonElement;
  let inputRef: HTMLInputElement;

  // Sync internal value when prop changes
  $effect(() => {
    internalValue = value;
  });

  // Autofocus input when dropdown opens
  $effect(() => {
    if (showDropdown && inputRef) {
      setTimeout(() => inputRef?.focus(), 0);
    }
  });

  const filteredItems = $derived.by(() => {
    if (!filterText) return items.slice(0, 10);
    const lower = filterText.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(lower)).slice(0, 10);
  });

  function handleSelectClick() {
    if (!disabled) {
      showDropdown = !showDropdown;
      filterText = '';
    }
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    filterText = target.value;
  }

  function handleSelectItem(item: string) {
    internalValue = item;
    filterText = '';
    showDropdown = false;
    onchange?.(item);
  }

  function handleBlur(e: FocusEvent) {
    // Only close if focus is leaving the component entirely
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest('.select-asset-or-pair')) {
      return;
    }
    setTimeout(() => {
      showDropdown = false;
      filterText = '';
    }, 150);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      showDropdown = false;
      filterText = '';
      selectRef?.focus();
    }
  }
</script>

<div class="select-asset-or-pair">
  <button
    bind:this={selectRef}
    {id}
    type="button"
    class="select-button"
    class:disabled
    class:open={showDropdown}
    onclick={handleSelectClick}
    onblur={handleBlur}
    {disabled}
  >
    <span class="select-value">{internalValue || placeholder}</span>
    <span class="select-arrow">{showDropdown ? '▲' : '▼'}</span>
  </button>

  {#if showDropdown && !disabled}
    <div class="dropdown">
      <input
        bind:this={inputRef}
        type="text"
        class="filter-input"
        placeholder="Type to filter..."
        bind:value={filterText}
        oninput={handleInputChange}
        onblur={handleBlur}
        onkeydown={handleKeyDown}
      />

      <div class="dropdown-list">
        {#if filteredItems.length === 0}
          <div class="dropdown-empty">No items found</div>
        {:else}
          {#each filteredItems as item}
            <button
              type="button"
              class="dropdown-item"
              class:selected={item === internalValue}
              onclick={() => handleSelectItem(item)}
              onblur={handleBlur}
            >
              {item}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .select-asset-or-pair {
    position: relative;
  }

  .select-button {
    width: 100%;
    padding: 8px 12px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover:not(:disabled) {
      border-color: var(--color-accent);
    }

    &.open {
      border-color: var(--color-accent);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .select-value {
    flex: 1;
  }

  .select-arrow {
    font-size: 10px;
    color: var(--color-text-muted);
    margin-left: var(--spacing-sm);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
  }

  .filter-input {
    width: 100%;
    padding: 8px 12px;
    background: var(--color-bg-primary);
    border: none;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: 13px;

    &:focus {
      outline: none;
      background: var(--color-bg-secondary);
    }

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  .dropdown-list {
    max-height: 250px;
    overflow-y: auto;
  }

  .dropdown-item {
    width: 100%;
    padding: 8px 12px;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
    cursor: pointer;
    transition: background var(--transition);

    &:hover {
      background: var(--color-bg-hover);
    }

    &.selected {
      background: var(--color-bg-tertiary);
      color: var(--color-accent);
      font-weight: 600;
    }
  }

  .dropdown-empty {
    padding: 8px 12px;
    font-size: 12px;
    color: var(--color-text-muted);
    text-align: center;
  }
</style>
