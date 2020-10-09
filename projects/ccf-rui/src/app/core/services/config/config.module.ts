import { NgModule } from '@angular/core';
import { GlobalsService } from 'ccf-shared';

import { GLOBAL_CONFIG, globalConfigFactory } from './config';


@NgModule({
  providers: [
    {
      provide: GLOBAL_CONFIG,
      useFactory: globalConfigFactory,
      deps: [GlobalsService]
    }
  ]
})
export class ConfigModule {}
