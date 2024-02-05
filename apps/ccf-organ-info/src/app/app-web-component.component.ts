import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { BaseWebComponent, BUILTIN_PARSERS, GenericGlobalConfig } from 'ccf-shared/web-components';

import { environment } from '../environments/environment';


function parseDataSources(value: unknown): string[] {
  const isString = (val: unknown): val is string => typeof val === 'string';
  const isStringArray = (val: unknown): val is string[] => Array.isArray(val) && val.every(isString);

  if (typeof value === 'string') {
    const json = BUILTIN_PARSERS.json(value);
    if (isStringArray(json)) {
      return json;
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid data sources');
}

function parseStringArray(value: unknown): string[] {
  const isString = (val: unknown): val is string => typeof val === 'string';
  const isStringArray = (val: unknown): val is string[] => Array.isArray(val) && val.every(isString);

  if (typeof value === 'string') {
    if (value?.startsWith('[')) {
      const json = BUILTIN_PARSERS.json(value);
      if (isStringArray(json)) {
        return json;
      }
    } else {
      return [value];
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid data sources');
}

@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root (sexChange)="sexChange.emit($event)" (nodeClick)="nodeClicked.emit($event)" (sideChange)="sideChange.emit($event)" *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWebComponent extends BaseWebComponent {
  @Input() organIri?: string;
  @Input() sex?: 'Both' | 'Male' | 'Female' = 'Female';
  @Input() side?: 'Left' | 'Right' = 'Left';
  @Input() dataSources!: string | string[];
  @Input() highlightProviders!: string | string[];

  @Input() hubmapDataService!: string;
  @Input() hubmapDataUrl!: string;
  @Input() hubmapAssetUrl!: string;
  @Input() hubmapToken!: string;
  @Input() hubmapPortalUrl!: string;

  @Input() useRemoteApi!: string | boolean;
  @Input() remoteApiEndpoint!: string;

  @Input() donorLabel!: string;
  @Input() ruiUrl!: string;
  @Input() euiUrl!: string;
  @Input() asctbUrl!: string;
  @Input() hraPortalUrl!: string;
  @Input() onlineCourseUrl!: string;
  @Input() paperUrl!: string;

  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();
  @Output() readonly nodeClicked = new EventEmitter();

  constructor(
    configStore: GlobalConfigState<GenericGlobalConfig>,
    cdr: ChangeDetectorRef
  ) {
    super(configStore, cdr, {
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...globalThis['dbOptions']
      },
      parse: {
        dataSources: parseDataSources,
        highlightProviders: parseStringArray,
        useRemoteApi: BUILTIN_PARSERS.boolean
      }
    });
  }
}
