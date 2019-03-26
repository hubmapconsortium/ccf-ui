import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'body',
    loadChildren: './views/body/body.module#BodyModule'
  },
  {
    path: ':organ',
    loadChildren: './views/organ/organ.module#OrganModule',
  },
  {
    path: ':organ/tissues',
    loadChildren: './views/tissues-browser/tissues-browser.module#TissuesBrowserModule'
  },
  {
    path: ':organ/:tissueId',
    loadChildren: './views/tissue/tissue.module#TissueModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/body'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
