import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganComponent } from './organ.component';


const routes: Routes = [
  {
    path: '',
    component: OrganComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganRoutingModule { }
