<script lang="ts">
  import { methodCategories } from '../method-definitions';
  import { authState, methodState } from '../stores/app-state.svelte';
  import type { MethodCategory } from '../../types/ui-types';

  let searchQuery = $state('');

  // Initialize with all categories collapsed
  const initialCollapsedCategories = new Set(methodCategories.map(cat => cat.name));
  let collapsedCategories = $state<Set<string>>(initialCollapsedCategories);

  const isQuickActionsSelected = $derived(methodState.selectedMethod === null);

  // Filter methods based on auth and search
  const filteredCategories = $derived.by(() => {
    return methodCategories
      .map((category) => {
        // Hide private categories if not authenticated
        const isPrivate = category.name.includes('Private');
        if (isPrivate && !authState.isAuthenticated) {
          return null;
        }

        // Filter methods by search query
        const filteredMethods = category.methods.filter((method) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          return (
            method.name.toLowerCase().includes(query) ||
            method.description.toLowerCase().includes(query) ||
            method.endpoint.toLowerCase().includes(query)
          );
        });

        if (filteredMethods.length === 0) return null;

        return {
          ...category,
          methods: filteredMethods
        };
      })
      .filter((c): c is MethodCategory => c !== null);
  });

  function toggleCategory(categoryName: string) {
    if (collapsedCategories.has(categoryName)) {
      collapsedCategories.delete(categoryName);
    } else {
      collapsedCategories.add(categoryName);
    }
    collapsedCategories = new Set(collapsedCategories);
  }

  function selectMethod(methodName: string, methodType: string) {
    methodState.setMethod(methodName, methodType);
  }
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <div class="search-wrapper">
      <input
        type="text"
        class="input search-input"
        placeholder="Search methods..."
        bind:value={searchQuery}
      />
    </div>
  </div>

  <div class="sidebar-content">
    <!-- Quick Actions Category -->
    <div class="category">
      <button
        class="category-header quick-actions-header"
        class:active={isQuickActionsSelected}
        onclick={() => methodState.setMethod('', '')}
      >
        <span class="category-chevron">⚡</span>
        <span class="category-name">Quick Actions</span>
      </button>
    </div>

    <!-- Separator after Quick Actions -->
    <div class="category-separator"></div>

    {#if filteredCategories.length === 0}
      <div class="sidebar-empty">
        <div class="sidebar-empty-icon">🔍</div>
        <div class="sidebar-empty-text">No methods found</div>
      </div>
    {:else}
      {#each filteredCategories as category, index}
        {@const isCollapsed = collapsedCategories.has(category.name)}
        {@const isPrivate = category.name.includes('Private')}
        {@const prevCategory = index > 0 ? filteredCategories[index - 1] : null}
        {@const isNewGroup = prevCategory && (
          (prevCategory.name.includes('REST') && category.name.includes('WebSocket'))
        )}
        {@const isCategoryActive = category.methods.some(method => {
          const methodKey = `${method.type}:${method.name}`;
          return methodState.selectedMethodKey === methodKey;
        })}

        {#if isNewGroup}
          <div class="category-separator"></div>
        {/if}

        <div class="category">
          <button
            class="category-header"
            class:active={isCategoryActive}
            onclick={() => toggleCategory(category.name)}
          >
            <span class="category-chevron" class:collapsed={isCollapsed}>▼</span>
            <span class="category-name">
              {category.name}{#if isPrivate}<span class="lock-emoji">🔓</span>{/if}
            </span>
            <span class="category-count">{category.methods.length}</span>
          </button>

          {#if !isCollapsed}
            <div class="category-methods">
              {#each category.methods as method}
                {@const methodKey = `${method.type}:${method.name}`}
                {@const isActive = methodState.selectedMethodKey === methodKey}
                <button
                  class="method-item"
                  class:active={isActive}
                  onclick={() => selectMethod(method.name, method.type)}
                >
                  <div class="method-name">{method.name}</div>
                  <div class="method-endpoint">{method.endpoint}</div>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-header {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
  }

  .search-input {
    font-size: 13px;

    &::placeholder {
      font-size: 13px;
    }
  }

  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-sm) 0;
  }

  .sidebar-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
    color: var(--color-text-muted);
    text-align: center;
  }

  .sidebar-empty-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
    opacity: 0.5;
  }

  .sidebar-empty-text {
    font-size: 13px;
  }

  .category {
    margin-bottom: var(--spacing-xs);
  }

  .category-separator {
    height: 1px;
    background: var(--color-border);
    margin: var(--spacing-md) var(--spacing-md);
    opacity: 0.5;
  }

  .category-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: transparent;
    border: none;
    border-left: 3px solid transparent;
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-hover);
    }

    &.active {
      border-left-color: var(--color-accent);
      background: rgba(88, 166, 255, 0.05);

      .category-name {
        color: var(--color-accent);
      }
    }

    &.quick-actions-header {
      background: rgba(88, 166, 255, 0.1);
      border-radius: var(--border-radius);
      margin: 0 var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
      padding: var(--spacing-md);
      color: var(--color-accent);
      width: calc(100% - var(--spacing-sm) * 2);
      border-left: 3px solid transparent;
      transition: all var(--transition);

      &:hover {
        background: rgba(88, 166, 255, 0.15);
      }

      &.active {
        background: rgba(88, 166, 255, 0.2);
        border-left-color: var(--color-accent);
        box-shadow: 0 2px 8px rgba(88, 166, 255, 0.2);

        .category-chevron {
          transform: scale(1.1);
        }
      }

      .category-chevron {
        font-size: 14px;
        color: var(--color-accent);
        transition: transform var(--transition);
      }
    }
  }

  .category-chevron {
    font-size: 8px;
    color: var(--color-text-muted);
    transition: transform var(--transition);

    &.collapsed {
      transform: rotate(-90deg);
    }
  }

  .category-name {
    flex: 1;
    text-align: left;

    .lock-emoji {
      margin-left: var(--spacing-sm);
      opacity: 0.7;
    }
  }

  .category-count {
    font-size: 11px;
    color: var(--color-text-muted);
    background: var(--color-bg-tertiary);
    padding: 2px 6px;
    border-radius: 10px;
  }

  .category-methods {
    padding: var(--spacing-xs) 0;
  }

  .method-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) calc(var(--spacing-md) + 16px);
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    text-align: left;
    cursor: pointer;
    transition: all var(--transition);

    &:hover {
      background: var(--color-bg-hover);
    }

    &.active {
      background: var(--color-bg-tertiary);
      border-left-color: var(--color-accent);

      .method-name {
        color: var(--color-accent);
        font-weight: 600;
      }
    }
  }

  .method-name {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 2px;
  }

  .method-endpoint {
    font-size: 11px;
    color: var(--color-text-muted);
    font-family: var(--font-mono);
  }
</style>
