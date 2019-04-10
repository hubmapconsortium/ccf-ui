import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganComponent } from './organ.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OrganComponent
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
export class OrganRoutingModule { }
