import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { OntologyState } from './shared/state/ontology/ontology.state';
import { MainModule } from './views/main/main.module';

const rootStates = [
  OntologyState
  // Add additional root states here!
];

@NgModule({
  imports: [
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MainModule,
    NgxsModule.forRoot(rootStates, { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AboutComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ AboutComponent ]
})
export class AppModule { }
