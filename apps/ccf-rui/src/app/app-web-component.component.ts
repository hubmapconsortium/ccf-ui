import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { GlobalConfigState } from 'ccf-shared';
import { BaseWebComponent, BUILTIN_PARSERS } from 'ccf-shared/web-components';
import { ObservableInput } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';

import { environment } from '../environments/environment';


export type User = NonNullable<GlobalConfig['user']>;
export type Organ = NonNullable<GlobalConfig['organ']>;
export type RegistrationCallback = (data: unknown) => void;
export type CancelRegistrationCallback = () => void;
export type FetchPreviousRegistrationsCallback = () => ObservableInput<Record<string, unknown>[]>;


function parseOrgan(value: unknown): string | Organ {
  try {
    return BUILTIN_PARSERS.json(value) as Organ;
  } catch {
    return '' + value;
  }
}


@Component({
  selector: 'ccf-root-wc',
  template: '<ccf-root *ngIf="initialized"></ccf-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWebComponent extends BaseWebComponent {
  @Input() baseHref!: string;
  @Input() useDownload!: string | boolean;
  @Input() user!: string | User;
  @Input() organ!: string | Organ;
  @Input() editRegistration!: string | SpatialEntityJsonLd;
  @Input() register!: string | RegistrationCallback;
  @Input() cancelRegistration!: string | CancelRegistrationCallback;
  @Input() fetchPreviousRegistrations!: string | FetchPreviousRegistrationsCallback;
  @Input() skipUnsavedChangesConfirmation!: string | boolean;
  @Input() theme!: string;
  @Input() header!: string | boolean;
  @Input() homeUrl!: string;
  @Input() logoTooltip!: string;
  @Input() organOptions!: string | string[];
  @Input() collisionsEndpoint!: string;

  constructor(
    configStore: GlobalConfigState<GlobalConfig>,
    cdr: ChangeDetectorRef
  ) {
    const BP = BUILTIN_PARSERS;

    super(configStore, cdr, {
      initialConfig: {
        ...environment.dbOptions,
        ...globalThis['ruiConfig' as string],
        ...environment.customization
      },
      parse: {
        useDownload: BP.boolean,
        user: BP.json,
        organ: parseOrgan,
        editRegistration: BP.json,
        register: BP.function,
        cancelRegistration: BP.function,
        fetchPreviousRegistrations: BP.function,
        skipUnsavedChangesConfirmation: BP.boolean,
        header: BP.boolean,
        organOptions: BP.stringArray
      }
    });
  }
}
