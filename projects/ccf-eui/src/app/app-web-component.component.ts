import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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


@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWebComponent extends BaseWebComponent {
  @Input() dataSources: string | string[];

  @Input() hubmapDataService: string;
  @Input() hubmapDataUrl: string;
  @Input() hubmapAssetUrl: string;
  @Input() hubmapToken: string;
  @Input() hubmapPortalUrl: string;

  @Input() useRemoteApi: string | boolean;
  @Input() remoteApiEndpoint: string;
  @Input() theme: string;
  @Input() header: string | boolean;
  @Input() homeUrl: string;
  @Input() logoTooltip: string;

  initialized: boolean;

  constructor(
    configStore: GlobalConfigState<GenericGlobalConfig>,
    cdr: ChangeDetectorRef
  ) {
    super(configStore, cdr, {
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...globalThis['dbOptions'],
        ...environment.customization
      },
      parse: {
        dataSources: parseDataSources,
        useRemoteApi: BUILTIN_PARSERS.boolean,
        header: BUILTIN_PARSERS.boolean
      }
    });
  }
}
