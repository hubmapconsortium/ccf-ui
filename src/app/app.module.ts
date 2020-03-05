import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { DrawerModule } from "./shared/components/drawer/drawer.module";
import { FiltersPopoverComponent } from "./shared/components/filters-popover/filters-popover.component";
import { FiltersContentComponent } from "./shared/components/filters-content/filters-content.component";
import { FiltersCheckboxComponent } from "./shared/components/filters-checkbox/filters-checkbox.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DrawerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    FiltersPopoverComponent,
    FiltersContentComponent,
    FiltersCheckboxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
