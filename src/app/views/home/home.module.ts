import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
