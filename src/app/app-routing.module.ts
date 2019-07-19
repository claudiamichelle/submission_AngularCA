import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import {PlanetDetailComponent} from "./planet-detail/planet-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category/people', component: HeroDetailComponent },
  { path: 'category/people/:name', component: HeroesComponent },
  { path: 'category/planets', component: PlanetDetailComponent },
  { path: 'category/planets/:name', component: PlanetDetailComponent },
  { path: 'category/vehicles', component: PlanetDetailComponent },
  { path: 'category/vehicles/:name', component: PlanetDetailComponent },
  { path: 'category/starships', component: PlanetDetailComponent },
  { path: 'category/starships/:name', component: PlanetDetailComponent },
  { path: 'category/films', component: PlanetDetailComponent },
  { path: 'category/films/:name', component: PlanetDetailComponent },
  { path: 'category/species', component: PlanetDetailComponent },
  { path: 'category/species/:name', component: PlanetDetailComponent },



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
