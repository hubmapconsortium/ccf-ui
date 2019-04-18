// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/zone-testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Shallow } from 'shallow-render';

import { routes } from './app/app-routing.module';
import { AppStateModule } from './app/app-state.module';


declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Initialize shallow render environment.
@Component({ selector: 'ccf-empty', template: '' })
class EmptyComponent { }

@NgModule({ declarations: [EmptyComponent], exports: [EmptyComponent] })
class EmptyModule { }

const testingRoutes = routes.map(route => {
  if ('redirectTo' in route) { return route; }
  return { path: route.path, component: EmptyComponent };
});

const globalImports = [
  AppStateModule, EmptyModule,
  RouterTestingModule.withRoutes(testingRoutes),
  HttpClientTestingModule
];

Shallow.alwaysImport(...globalImports);
Shallow.neverMock(...globalImports);

// Then, we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
