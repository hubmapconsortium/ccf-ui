import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TissuesBrowserComponent } from './tissues-browser.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TissuesBrowserComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TissuesBrowserRoutingModule { }
