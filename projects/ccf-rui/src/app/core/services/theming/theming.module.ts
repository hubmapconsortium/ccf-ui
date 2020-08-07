import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';

import { ThemingService } from './theming.service';


@NgModule({
  providers: [
    { provide: APP_BOOTSTRAP_LISTENER, useValue: ThemingService.initialize, multi: true },
    ThemingService
  ]
})
export class ThemingModule { }
