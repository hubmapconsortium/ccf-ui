import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { BaseWebComponent, BUILTIN_PARSERS, GenericGlobalConfig } from 'ccf-shared/web-components';
import { JsonLd, JsonLdObj } from 'jsonld/jsonld-spec';

import { environment } from '../environments/environment';


function toJsonLd(data: {id: string, rui_location: JsonLdObj}[]): JsonLd {
  return data.map(d => ({
    '@id': `http://purl.org/ccf/1.5/entity/${d.id}`,
    '@type': 'http://purl.org/ccf/latest/ccf-entity.owl#Sample',
    'http://purl.org/ccf/latest/ccf-entity.owl#has_spatial_entity': d.rui_location
  })) as unknown as JsonLd;
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
        data: toJsonLd
      }
    });
  }
}
