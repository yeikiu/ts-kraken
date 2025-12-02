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
    placeholder = 'Type to add items...'
  }: Props = $props();

  let internalValue = $state(value);
  let inputText = $state('');
  let showSuggestions = $state(false);
  let inputRef: HTMLInputElement;

  // Sync internal value when prop changes
  $effect(() => {
    internalValue = value;
  });

  // Parse selected items from comma-separated value
  const selectedItems = $derived.by(() => {
    if (!internalValue) return [];
    return internalValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
  });

  // Filter suggestions based on input and exclude already selected
  const suggestions = $derived.by(() => {
    if (!inputText || inputText.length < 1) return [];
    const lower = inputText.toLowerCase();
    return items
      .filter(item =>
        item.toLowerCase().includes(lower) &&
        !selectedItems.includes(item)
      )
      .slice(0, 20);
  });

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    inputText = target.value;
    showSuggestions = inputText.length > 0;
  }

  function addItem(item: string) {
    const newItems = [...selectedItems, item];
    internalValue = newItems.join(', ');
    inputText = '';
    showSuggestions = false;
    onchange?.(internalValue);
    inputRef?.focus();
  }

  function removeItem(item: string) {
    const newItems = selectedItems.filter(i => i !== item);
    internalValue = newItems.join(', ');
    onchange?.(internalValue);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      showSuggestions = false;
      inputText = '';
    } else if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      addItem(suggestions[0]);
    } else if (e.key === 'Backspace' && inputText === '' && selectedItems.length > 0) {
      // Remove last item on backspace when input is empty
      removeItem(selectedItems[selectedItems.length - 1]);
    }
  }

  function handleBlur() {
    // Delay to allow click events on suggestions
    setTimeout(() => {
      showSuggestions = false;
    }, 200);
  }

  function handleFocus() {
    if (inputText.length > 0) {
      showSuggestions = true;
    }
  }
</script>

<div class="select-asset-or-pair-list">
  <div class="input-container" class:disabled>
    {#if selectedItems.length > 0}
      <div class="selected-items">
        {#each selectedItems as item}
          <button
            type="button"
            class="item-tag"
            onclick={() => removeItem(item)}
            disabled={disabled}
          >
            {item}
            <span class="remove-icon">×</span>
          </button>
        {/each}
      </div>
    {/if}

    <input
      bind:this={inputRef}
      {id}
      type="text"
      class="item-input"
      {placeholder}
      bind:value={inputText}
      oninput={handleInputChange}
      onkeydown={handleKeyDown}
      onblur={handleBlur}
      onfocus={handleFocus}
      {disabled}
    />
  </div>

  {#if showSuggestions && suggestions.length > 0 && !disabled}
    <div class="suggestions">
      {#each suggestions as item}
        <button
          type="button"
          class="suggestion-item"
          onclick={() => addItem(item)}
        >
          {item}
        </button>
      {/each}
    </div>
  {/if}

  {#if showSuggestions && inputText.length > 0 && suggestions.length === 0 && !disabled}
    <div class="suggestions">
      <div class="suggestion-empty">No matching items found</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .select-asset-or-pair-list {
    position: relative;
    width: 100%;
  }

  .input-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding: 6px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    min-height: 38px;
    transition: border-color var(--transition);

    &:focus-within {
      border-color: var(--color-accent);
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  .item-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity var(--transition);

    &:hover:not(:disabled) {
      opacity: 0.8;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .remove-icon {
      font-size: 16px;
      line-height: 1;
      font-weight: bold;
    }
  }

  .item-input {
    flex: 1;
    min-width: 120px;
    padding: 4px;
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: 13px;
    outline: none;

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-height: 250px;
    overflow-y: auto;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }

  .suggestion-item {
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
  }

  .suggestion-empty {
    padding: 8px 12px;
    font-size: 12px;
    color: var(--color-text-muted);
    text-align: center;
  }
</style>
