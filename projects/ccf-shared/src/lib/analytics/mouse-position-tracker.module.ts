import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MousePositionTrackerComponent } from './mouse-position-tracker.component';


@NgModule({
  imports: [CommonModule],
  declarations: [MousePositionTrackerComponent],
  exports: [MousePositionTrackerComponent]
})
export class MousePositionTrackerModule {}
