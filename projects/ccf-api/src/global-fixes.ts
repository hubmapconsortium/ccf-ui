import fetch, { Request, Response, Headers } from 'node-fetch';

// Simple helper to make typescript happy
function castToGlobalType<K extends keyof typeof globalThis>(value: unknown): (typeof globalThis)[K] {
  return value as (typeof globalThis)[K];
}

// Fix for improper references in triple-store-utils
globalThis.self = globalThis as unknown as typeof globalThis.window;

// Fix ccf-database usage of fetch
if (typeof globalThis.fetch !== 'function') {
  globalThis.fetch = castToGlobalType<'fetch'>(fetch);
  globalThis.Headers = castToGlobalType<'Headers'>(Headers);
  globalThis.Request = castToGlobalType<'Request'>(Request);
  globalThis.Response = castToGlobalType<'Response'>(Response);
}
