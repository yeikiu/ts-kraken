// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.ts

const isBrowser: boolean =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isNode: boolean =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const isWebWorker: boolean =
  typeof self === 'object' &&
  self.constructor &&
  self.constructor.name === 'DedicatedWorkerGlobalScope';

// https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
const isJsDom: boolean =
  (typeof window !== 'undefined' && window.name === 'nodejs') ||
  (typeof navigator !== 'undefined' &&
    'userAgent' in navigator &&
    typeof navigator.userAgent === 'string' &&
    (navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom')));

const isDeno: boolean =
  // @ts-expect-error ts-2304
  typeof Deno !== 'undefined' &&
  // @ts-expect-error ts-2304
  typeof Deno.version !== 'undefined' &&
  // @ts-expect-error ts-2304
  typeof Deno.version.deno !== 'undefined';


/** @see {@link https://bun.sh/guides/util/detect-bun} */
const isBun = typeof process !== 'undefined' && process.versions != null && process.versions.bun != null;

export { isBrowser, isWebWorker, isNode, isJsDom, isDeno, isBun };
