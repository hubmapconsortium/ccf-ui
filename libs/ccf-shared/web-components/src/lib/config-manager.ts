import { SimpleChange, SimpleChanges } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';


export type GenericGlobalConfig = Record<string, unknown>;

export interface ConfigManagerOptions {
  initialConfig?: GenericGlobalConfig;

  parse?: Record<string, (value: unknown) => unknown>;
  rename?: Record<string, string>;
}


const DEFAULT_OPTIONS: Required<ConfigManagerOptions> = {
  initialConfig: {},
  parse: {},
  rename: {}
};


export class ConfigManager {
  readonly options: Required<ConfigManagerOptions>;

  private storedChanges: SimpleChanges = {};

  constructor(
    readonly configState: GlobalConfigState<GenericGlobalConfig>,
    options: ConfigManagerOptions
  ) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  addChanges(changes: SimpleChanges): void {
    this.storedChanges = { ...this.storedChanges, ...changes };
  }

  applyChanges(changes?: SimpleChanges, additionalConfig: GenericGlobalConfig = {}): void {
    if (changes === undefined) {
      changes = this.storedChanges;
      this.storedChanges = {};
    }

    const { configState, options: { initialConfig } } = this;
    const previousConfig = configState.snapshot;
    const newConfig = { ...initialConfig, ...previousConfig, ...additionalConfig };

    for (const [key, change] of Object.entries(changes)) {
      this.processChange(key, change, newConfig);
    }

    configState.setConfig(newConfig);
  }

  private processChange(key: string, change: SimpleChange, output: GenericGlobalConfig): void {
    const { options: { parse, rename } } = this;
    const target = rename[key] ?? key;
    const value = change.currentValue;
    const parser = parse[key] ?? parse[target];

    if (value == null) {
      delete output[target];
    } else if (!parser) {
      output[target] = value;
    } else {
      try {
        output[target] = parser(value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to parse ${key} = ${value} (${typeof value})`, (error as Error).message);
      }
    }
  }
}
