import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { BodyOverlays } from './body-overlays';

@NgModule({
  imports: [
    CommonModule,
    BodyRoutingModule
  ],
  declarations: [ BodyComponent ],
  providers: [ BodyDataService, BodyOverlays ]
})
export class BodyModule { }
