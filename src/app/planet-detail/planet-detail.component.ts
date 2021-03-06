// @ts-ignore
import { Component, OnInit, Input } from '@angular/core';
// @ts-ignore
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
import { Location } from '@angular/common';

import {PlanetService} from "../planet.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: [ './planet-detail.component.css' ]
})
export class PlanetDetailComponent implements OnInit {
    @Input()

    planets: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private planetService: PlanetService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/planets/';
        this.prevPg = '';
        this.nextPg = '';
        this.getPlanets();
    }

    getPlanets(): void {

        this.planetService.callAPI(this.thisPg).subscribe(
            planets => {
                this.planets   = Object.values(planets['results']);
            });

        this.planetService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.planetService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.planetService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.planetService.callAPI(this.thisPg).subscribe(
            planets => {
                this.planets = Object.values(planets['results']);
            });
    }

    previousPage(): void {

        // if (this.prevPg = "")
        // {
        //     console.log("This is the first page.");
        //     return;
        // }

        console.log('CLICKED PREVIOUS');

        this.nextPg = this.thisPg;
        this.thisPg = this.prevPg;
        this.planetService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.planetService.callAPI(this.thisPg).subscribe(
            planets => {
                this.planets = Object.values(planets['results']);
            });
    }

    getPlanetDetail(number :number): void {
        console.log('CLICKED A PLANET');
        console.log(number);
        this.planetService.getPlanetDetails(number).subscribe(details => this.details = Object(details));
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
