import {
  ChangeDetectorRef,
  Directive,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

import {
  ConfigManager,
  ConfigManagerOptions,
  GenericGlobalConfig,
} from './config-manager';

export interface BaseWebComponentOptions extends ConfigManagerOptions {
  initialDelay?: number;
}

@Directive()
export class BaseWebComponent implements OnInit, OnChanges, OnDestroy {
  initialized = false;
  configManager = new ConfigManager(this.configState, this.options);

  private _init?: ReturnType<typeof setTimeout>;

  constructor(
    readonly configState: GlobalConfigState<GenericGlobalConfig>,
    readonly cdr: ChangeDetectorRef,
    readonly options: BaseWebComponentOptions = {}
  ) {}

  ngOnInit(): void {
    this._init = setTimeout(
      () => this.initialize(),
      this.options.initialDelay ?? 0
    );
  }

  ngOnDestroy(): void {
    if (this._init) {
      clearTimeout(this._init);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.configManager.addChanges(changes);
    if (this.initialized) {
      this.configManager.applyChanges();
    }
  }

  initialize(): void {
    this._init = undefined;
    if (this.initialized) {
      return;
    }

    this.configManager.applyChanges();
    this.initialized = true;
    this.cdr.markForCheck();
  }
}
