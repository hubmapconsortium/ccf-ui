import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';

import { bootstrap, ThemingService } from './theming.service';

@NgModule({
  providers: [
    { provide: APP_BOOTSTRAP_LISTENER, useValue: bootstrap, multi: true },
    ThemingService
  ]
})
export class ThemingModule { }
