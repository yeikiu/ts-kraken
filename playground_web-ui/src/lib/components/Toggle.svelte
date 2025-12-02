<script lang="ts">
  interface Props {
    checked?: boolean;
    onchange?: (checked: boolean) => void;
    id?: string;
    disabled?: boolean;
    label?: string;
  }

  let { checked = false, onchange, id, disabled = false, label }: Props = $props();

  function handleClick() {
    if (disabled) return;
    onchange?.(!checked);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onchange?.(!checked);
    }
  }
</script>

<div class="toggle-wrapper">
  <button
    {id}
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label || 'Toggle switch'}
    class="toggle"
    class:checked
    class:disabled
    onclick={handleClick}
    onkeydown={handleKeyDown}
    {disabled}
  >
    <span class="toggle-thumb" class:checked></span>
  </button>
  {#if label}
    <label for={id} class="toggle-label">{label}</label>
  {/if}
</div>

<style lang="scss">
  .toggle-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .toggle {
    position: relative;
    width: 42px;
    height: 24px;
    background: var(--color-bg-tertiary);
    border: 2px solid var(--color-border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    outline: none;

    &:hover:not(:disabled) {
      border-color: var(--color-accent);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    &.checked {
      background: var(--color-accent);
      border-color: var(--color-accent);
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

    &.checked {
      transform: translateX(18px);
    }
  }

  .toggle-label {
    font-size: 13px;
    color: var(--color-text-primary);
    cursor: pointer;
    user-select: none;
  }
</style>
