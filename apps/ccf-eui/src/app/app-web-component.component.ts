import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import {
  BaseWebComponent,
  BUILTIN_PARSERS,
  GenericGlobalConfig,
} from 'ccf-shared/web-components';

import { environment } from '../environments/environment';
import { Filter } from 'ccf-database';

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function checkOptionalProperty(
  name: string,
  obj: object,
  prop: string,
  validator: (value: unknown) => boolean // returns boolean after being called. Logic is passed as an argument when 'checkProp()' is called.
): void {
  /** first check if prop(property name) is present in the obj(value) and then apply the validator function whose
   *logic is passed when the checkProp() is called.
  */
  if (prop in obj) {
    //obj[prop] is value for eg. 'Male' in sex
    if (!validator(obj[prop])) {
      throw new Error(`Invalid property ${prop} in ${name}`);
    }
  }
}

function parseDataSources(value: unknown): string[] {
  if (typeof value === 'string') {
    const json = BUILTIN_PARSERS.json(value);
    if (isStringArray(json)) {
      return json;
    }
  } else if (isStringArray(value)) {
    return value;
  }

  throw new Error('Invalid type for string array');
}

function parseFilter(value: unknown): string | Partial<Filter> {
  if (typeof value === 'string') {
    value = BUILTIN_PARSERS.json(value);
    if (isString(value)) {
      return value;
    }
  }

  if (typeof value === 'object' && value !== null) {
    const sexOptions = ['Both', 'Male', 'Female'];
    // predefine name as 'filter' and obj as value. 'this' is set to undefined
    const checkProp = checkOptionalProperty.bind(undefined, 'filter', value);
    checkProp('sex', val => isString(val) && sexOptions.includes(val));
    checkProp('ageRange', val => isNumberArray(val) && val.length === 2);
    checkProp('bmiRange', val => isNumberArray(val) && val.length === 2);
    checkProp('consortiums', isStringArray);
    checkProp('tmc', isStringArray);
    checkProp('technologies', val => isStringArray(val));
    checkProp('ontologyTerms', val => isStringArray(val));
    checkProp('cellTypeTerms', val => isStringArray(val));
    checkProp('biomarkerTerms', val => isStringArray(val));
    checkProp('spatialSearches', val => isStringArray(val));
    return value as Filter;
  }

  throw new Error('Invalid filter');
}

@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWebComponent extends BaseWebComponent {
  @Input() baseHref!: string;
  @Input() dataSources!: string | string[];
  @Input() selectedOrgans!: string[];

  @Input() hubmapDataService!: string;
  @Input() hubmapDataUrl!: string;
  @Input() hubmapAssetUrl!: string;
  @Input() hubmapToken!: string;
  @Input() hubmapPortalUrl!: string;

  @Input() useRemoteApi!: string | boolean;
  @Input() remoteApiEndpoint!: string;
  @Input() theme!: string;
  @Input() header!: string | boolean;
  @Input() homeUrl!: string;
  @Input() logoTooltip!: string;
  @Input() loginDisabled!: boolean;
  @Input() filter!: string | Partial<Filter>;

  override initialized!: boolean;

  constructor(
    configStore: GlobalConfigState<GenericGlobalConfig>,
    cdr: ChangeDetectorRef
  ) {
    super(configStore, cdr, {
      initialDelay: 10,

      initialConfig: {
        ...environment.dbOptions,
        ...globalThis['dbOptions'],
        ...environment.customization,
      },
      parse: {
        dataSources: parseDataSources,
        useRemoteApi: BUILTIN_PARSERS.boolean,
        header: BUILTIN_PARSERS.boolean,
        loginDisabled: BUILTIN_PARSERS.boolean,
        filter: parseFilter,
      },
    });
  }
}
