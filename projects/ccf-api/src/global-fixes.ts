import fetch from 'node-fetch';

// Fix for improper references in triple-store-utils
globalThis.self = globalThis as unknown as typeof globalThis.window;

// Fix ccf-database usage of fetch
globalThis.fetch = fetch as unknown as typeof globalThis.fetch;
