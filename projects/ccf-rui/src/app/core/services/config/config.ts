import { InjectionToken } from '@angular/core';
import { GlobalsService } from 'ccf-shared';
import { ObservableInput } from 'rxjs';


export interface GlobalConfig {
  baseHref?: string;
  editRegistration?: Record<string, unknown>;
  organ?: {
    name: 'large intestine' | 'heart' | 'kidney' | 'spleen';
    ontologyId?: string;
    sex?: 'male' | 'female';
    side?: 'left' | 'right';
  };
  user?: {
    firstName: string;
    lastName: string;
  };

  register?: (data: string) => void;
  useDownload?: boolean;

  fetchPreviousRegistrations?: () => ObservableInput<Record<string, unknown>[]>;
  registrationStarted?: boolean;

  cancelRegistration?: () => void;
}

declare global {
  let ruiConfig: GlobalConfig;
}

export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>(
  'Global configuration object'
);

export function globalConfigFactory(globals: GlobalsService): GlobalConfig {
  return globals.get('ruiConfig', {});
}
