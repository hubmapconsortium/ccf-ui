import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AboutModalService } from '../../shared/services/about-modal.service';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [ AboutComponent ],
  providers: [ AboutModalService ]
})
export class AboutModule { }
