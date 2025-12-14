/**
 * Utility functions for managing URL query parameters
 */

/**
 * Get a query parameter from the current URL
 */
export function getUrlParam(key: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * Set a query parameter in the URL without triggering a page reload
 */
export function setUrlParam(key: string, value: string | null) {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);

  if (value === null || value === '') {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  // Update URL without reloading the page
  window.history.replaceState({}, '', url.toString());
}

/**
 * Get all query parameters as an object
 */
export function getAllUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
