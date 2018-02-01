import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SelectOfficeService } from './select-office.service';



import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ProjectionTableComponent } from './projection-table/projection-table.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideMenuComponent,
    ProjectionTableComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQCADoAqWBHr-aIHcBzrfgqKD-HP5Kcjg'
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule,
    HttpModule

  ],
  providers: [
    SelectOfficeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
