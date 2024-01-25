import fetch, { Headers, Request, Response } from 'node-fetch';

type GlobalThis = typeof globalThis;

function patchGlobal<K extends keyof GlobalThis>(key: K, value: unknown): void {
  globalThis[key] = value as GlobalThis[K];
}

// Patch `self`
// triple-store-utils may have some improper references to `self`
if (typeof globalThis.self !== 'object') {
  patchGlobal('self', globalThis);
}

// Patch `fetch`
patchGlobal('fetch', fetch);
patchGlobal('Headers', Headers);
patchGlobal('Request', Request);
patchGlobal('Response', Response);
