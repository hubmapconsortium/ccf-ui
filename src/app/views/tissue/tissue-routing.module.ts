import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TissueComponent } from './tissue.component';

const routes: Routes = [
  {
    path: '',
    component: TissueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TissueRoutingModule { }
