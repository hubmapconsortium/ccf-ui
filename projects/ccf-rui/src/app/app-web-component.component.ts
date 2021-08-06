import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { GlobalConfigState } from 'ccf-shared';
import { ObservableInput } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';


export type User = NonNullable<GlobalConfig['user']>;
export type Organ = NonNullable<GlobalConfig['organ']>;
export type RegistrationCallback = (data: unknown) => void;
export type CancelRegistrationCallback = () => void;
export type FetchPreviousRegistrationsCallback = () => ObservableInput<Record<string, unknown>[]>;
type AnyFunction = (...args: unknown[]) => unknown;
type InputParser = (name: string, input: unknown) => (unknown | undefined);


function parseString(_name: string, input: string): string {
  return input;
}

function parseBoolean(_name: string, input: string | boolean): boolean {
  return String(input) !== 'false';
}

function parseJson(name: string, input: string | unknown): unknown | undefined {
  if (typeof input !== 'string') {
    return input;
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    console.error(`Failed to parse RUI.${name} as JSON. Error: `, error);
    return undefined;
  }
}

function parseFunction<T extends AnyFunction>(name: string, input: string | T): T | undefined {
  if (typeof input !== 'string') {
    return input;
  }

  console.error(`RUI.${name} must be a function`);
  return undefined;
}


const CONFIG_INPUT_PARSERS: Record<string, InputParser> = {
  baseHref: parseString,
  useDownload: parseBoolean,
  user: parseJson,
  organ: parseJson,
  editRegistration: parseJson,
  register: parseFunction,
  cancelRegistration: parseFunction,
  fetchPreviousRegistrations: parseFunction
};


@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWebComponentComponent implements OnInit, OnChanges {
  @Input() baseHref: string;
  @Input() useDownload: string | boolean;
  @Input() user: string | User;
  @Input() organ: string | Organ;
  @Input() editRegistration: string | SpatialEntityJsonLd;
  @Input() register: string | RegistrationCallback;
  @Input() cancelRegistration: string | CancelRegistrationCallback;
  @Input() fetchPreviousRegistrations: string | FetchPreviousRegistrationsCallback;

  initialized = false;
  changes: SimpleChanges = {};

  constructor(
    private readonly globalConfig: GlobalConfigState<GlobalConfig>,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      this.applyConfigChanges(changes, this.globalConfig.snapshot);
    } else {
      this.changes = { ...this.changes, ...changes };
    }
  }

  ngOnInit(): void {
    setTimeout(this.initialize.bind(this), 500);
  }

  private initialize(): void {
    const globalObj = globalThis as Record<string, unknown> as Record<string, GlobalConfig>;
    const backwardsCompatibleConfigKey = 'ruiConfig';
    const backwardsCompatibleConfigObj =
      typeof globalObj[backwardsCompatibleConfigKey] === 'object' &&
        globalObj[backwardsCompatibleConfigKey] !== null ?
        globalObj[backwardsCompatibleConfigKey] : {};

    this.applyConfigChanges(this.changes, backwardsCompatibleConfigObj);
    this.changes = {};
    this.initialized = true;
    this.cdr.markForCheck();
  }

  private applyConfigChanges(changes: SimpleChanges, config: GlobalConfig): void {
    const newConfig = { ...config };

    for (const [key, { currentValue: value }] of Object.entries(changes)) {
      if (key in CONFIG_INPUT_PARSERS) {
        if (value == null) {
          delete newConfig[key];
        } else {
          const parsedValue = CONFIG_INPUT_PARSERS[key](key, value);
          if (parsedValue !== undefined) {
            newConfig[key] = parsedValue;
          }
        }
      }
    }

    this.globalConfig.setConfig(newConfig);
  }
}
