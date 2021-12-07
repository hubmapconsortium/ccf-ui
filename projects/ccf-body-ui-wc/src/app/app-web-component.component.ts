import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { BaseWebComponent, BUILTIN_PARSERS, GenericGlobalConfig } from 'ccf-shared/web-components';
import { JsonLdObj } from 'jsonld/jsonld-spec';

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


@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized" (onHover)="onHover.emit($event)" (onClick)="onClick.emit($event)"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWebComponent extends BaseWebComponent {
  @Input() data: { id: string, rui_location: JsonLdObj }[];
  @Input() highlightID: string;
  @Input() zoomToID: string;

  @Output() readonly onHover = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  initialized: boolean;

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
        hubmapDataSources: parseDataSources
      },
      rename: {
        hubmapDataSources: 'dataSources'
      }
    });
  }
}
