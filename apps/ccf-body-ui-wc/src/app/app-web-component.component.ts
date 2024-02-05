/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { BaseWebComponent, GenericGlobalConfig } from 'ccf-shared/web-components';
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { environment } from '../environments/environment';

export interface InputDataFormat {
  id: string;
  rui_location: JsonLdObj;
}

function toJsonLd(data: unknown): JsonLdObj[] {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  return (data as InputDataFormat[]).map((d) => ({
    '@id': `http://purl.org/ccf/1.5/entity/${d.id}`,
    '@type': 'http://purl.org/ccf/latest/ccf-entity.owl#Sample',
    'http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity': d.rui_location,
  })) as unknown as JsonLdObj[];
}

@Component({
  selector: 'ccf-root-wc',
  template:
    '<ccf-root *ngIf="initialized" (onMouseEnter)="onMouseEnter.emit($event)" (onMouseLeave)="onMouseLeave.emit($event)" (onClick)="onClick.emit($event)"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent extends BaseWebComponent {
  @Input() data!: InputDataFormat[];
  @Input() highlightID!: string;
  @Input() zoomToID!: string;

  @Output() readonly onMouseEnter = new EventEmitter<string>();
  @Output() readonly onMouseLeave = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  constructor(configStore: GlobalConfigState<GenericGlobalConfig>, cdr: ChangeDetectorRef) {
    super(configStore, cdr, {
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...globalThis['dbOptions'],
      },
      parse: {
        data: toJsonLd,
      },
    });
  }
}
