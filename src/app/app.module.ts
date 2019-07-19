import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

import { FilmDetailComponent } from "./film-detail/film-detail.component";
import { PeopleDetailComponent } from "./people-detail/people-detail.component";
import { PlanetDetailComponent } from "./planet-detail/planet-detail.component";
import { SpeciesDetailComponent } from "./species-detail/species-detail.component";
import { StarshipDetailComponent } from "./starship-detail/starship-detail.component";
import { VehicleDetailComponent } from "./vehicle-detail/vehicle-detail.component";
import {MessagesComponent} from "./messages/messages.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ) */
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,

    FilmDetailComponent,
    PeopleDetailComponent,
    PlanetDetailComponent,
    SpeciesDetailComponent,
    StarshipDetailComponent,
    VehicleDetailComponent
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
