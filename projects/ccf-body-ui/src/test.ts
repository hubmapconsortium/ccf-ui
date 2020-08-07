// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Hack to force set globlThis to fix cannon-es error
function getGlobalThis(): typeof globalThis {
  if (typeof globalThis === 'object') {
    return globalThis;
  } else if (typeof window === 'object') {
    return window;
  } else if (typeof global === 'object') {
    return global as unknown as typeof globalThis;
  } else {
    return Function('return this;')() as typeof globalThis;
  }
}
const gbl = getGlobalThis();
(gbl as {globalThis: unknown}).globalThis = gbl;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
