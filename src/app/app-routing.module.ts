import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganGuard } from './shared/guards/organ/organ.guard';
import { TissueGuard } from './shared/guards/tissue/tissue.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'body/:bodyId',
    loadChildren: './views/body/body.module#BodyModule'
  },
  {
    path: 'organ/:organId',
    loadChildren: './views/organ/organ.module#OrganModule',
    canActivate: [OrganGuard]
  },
  {
    path: 'tissues',
    loadChildren: './views/tissues-browser/tissues-browser.module#TissuesBrowserModule'
  },
  {
    path: 'tissue/:tissueId',
    loadChildren: './views/tissue/tissue.module#TissueModule',
    canActivate: [TissueGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    // This should probably go to a 404 page in the future.
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
