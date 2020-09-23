import { NgModule } from '@angular/core';

import { NumberDirective } from './numbers-only.directive';


@NgModule({
  declarations: [NumberDirective],
  exports: [NumberDirective]
})
export class NumbersOnlyModule { }
