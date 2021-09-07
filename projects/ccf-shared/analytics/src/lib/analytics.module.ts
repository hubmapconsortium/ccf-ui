import { ModuleWithProviders, NgModule } from '@angular/core';
import { IGoogleAnalyticsCommand, NgxGoogleAnalyticsModule } from 'ngx-google-analytics';


interface AnalyticsOptions {
  gaToken: string;

  appName?: string;
  projectName?: string;

  developmentMode?: boolean;
}


function toAttributes(obj: Record<string, unknown>): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((attrs, [key, value]) => {
    if (value != null) {
      attrs[key] = `${value}`;
    }

    return attrs;
  }, {});
}

function initCommands(options: AnalyticsOptions): IGoogleAnalyticsCommand[] {
  const { appName, projectName, developmentMode } = options;

  return [
    {
      command: 'set',
      values: [toAttributes({
        appName,
        projectName,
        developmentMode
      })]
    }
  ];
}


@NgModule({
  imports: [
    NgxGoogleAnalyticsModule
  ]
})
export class AnalyticsModule {
  static forRoot(options: AnalyticsOptions): ModuleWithProviders<AnalyticsModule> {
    const { providers = [] } = NgxGoogleAnalyticsModule.forRoot(
      options.gaToken,
      initCommands(options)
    );

    return { ngModule: AnalyticsModule, providers };
  }
}
