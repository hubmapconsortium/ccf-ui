import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TissueResolverService } from './shared/resolvers/tissue-resolver/tissue-resolver.service';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'body',
    loadChildren: () => import('./views/body/body.module').then(m => m.BodyModule)
  },
  {
    path: 'organ/:organId',
    loadChildren: () => import('./views/organ/organ.module').then(m => m.OrganModule)
  },
  {
    path: 'tissues',
    loadChildren: () => import('./views/tissues-browser/tissues-browser.module').then(m => m.TissuesBrowserModule)
  },
  {
    path: 'tissue/:tissueId',
    loadChildren: () => import('./views/tissue/tissue.module').then(m => m.TissueModule),
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
