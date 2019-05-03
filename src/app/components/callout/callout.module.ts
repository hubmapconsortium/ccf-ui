import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalloutComponent } from './callout.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  declarations: [CalloutComponent],
  exports: [CalloutComponent]
})
export class CalloutModule { }
