import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TissueResolverService } from './shared/resolvers/tissue-resolver/tissue-resolver.service';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'body',
    loadChildren: './views/body/body.module#BodyModule'
  },
  {
    path: 'organ/:organId',
    loadChildren: './views/organ/organ.module#OrganModule'
  },
  {
    path: 'tissues',
    loadChildren: './views/tissues-browser/tissues-browser.module#TissuesBrowserModule'
  },
  {
    path: 'tissue/:tissueId',
    loadChildren: './views/tissue/tissue.module#TissueModule',
    resolve: {
      tissue: TissueResolverService
    }
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
