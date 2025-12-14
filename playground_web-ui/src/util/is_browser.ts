/**
 * Detect if we're running in a browser environment
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined' && typeof window.crypto !== 'undefined';
};
