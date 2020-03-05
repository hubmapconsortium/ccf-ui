import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { DrawerModule } from "./shared/components/drawer/drawer.module";
import { FiltersPopoverComponent } from "./modules/filters/filters-popover/filters-popover.component";
import { FiltersContentComponent } from "./modules/filters/filters-content/filters-content.component";
import { CheckboxComponent } from "./shared/components/checkbox/checkbox.component";

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
    CheckboxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
