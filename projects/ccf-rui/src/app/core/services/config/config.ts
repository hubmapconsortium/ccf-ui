import { InjectionToken } from '@angular/core';
import { GlobalsService } from 'ccf-shared';
import { ObservableInput } from 'rxjs';


export interface GlobalConfig {
  embedded?: boolean;
  tutorialMode?: boolean;
  homeUrl?: string;
  user?: {
    firstName: string;
    lastName: string;
  };

  register?: (data: string) => void;
  useDownload?: boolean;

  fetchPreviousRegistrations?: () => ObservableInput<object[]>;
}

declare global {
  var ruiConfig: GlobalConfig;
}

export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>(
  'Global configuration object'
);

export function globalConfigFactory(globals: GlobalsService): GlobalConfig {
  return globals.get('ruiConfig', {});
}
