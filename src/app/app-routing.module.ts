import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import {FilmDetailComponent} from "./film-detail/film-detail.component";
import {PeopleDetailComponent} from "./people-detail/people-detail.component";
import {PlanetDetailComponent} from "./planet-detail/planet-detail.component";
import {SpeciesDetailComponent} from "./species-detail/species-detail.component";
import {StarshipDetailComponent} from "./starship-detail/starship-detail.component";
import {VehicleDetailComponent} from "./vehicle-detail/vehicle-detail.component";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category/films', component: FilmDetailComponent },
  { path: 'category/films/:name', component: FilmDetailComponent },
  { path: 'category/people', component: PeopleDetailComponent },
  { path: 'category/people/:name', component: PeopleDetailComponent },
  { path: 'category/planets', component: PlanetDetailComponent },
  { path: 'category/planets/:name', component: PlanetDetailComponent },
  { path: 'category/species', component: SpeciesDetailComponent },
  { path: 'category/species/:name', component: SpeciesDetailComponent },
  { path: 'category/starships', component: StarshipDetailComponent },
  { path: 'category/starships/:name', component: StarshipDetailComponent },
  { path: 'category/vehicles', component: VehicleDetailComponent },
  { path: 'category/vehicles/:name', component: VehicleDetailComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
