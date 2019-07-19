import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import {getPluralCategory} from "@angular/common/src/i18n/localization";
import {forEach} from "@angular/router/src/utils/collection";
import {stringify} from "@angular/core/src/render3/util";
import {SpeciesService} from "../species.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: [ './species-detail.component.css' ]
})
export class SpeciesDetailComponent implements OnInit {
    @Input() hero: Hero;

    species: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private speciesService: SpeciesService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/species/';
        this.prevPg = '';
        this.nextPg = '';
        this.getSpecies();
    }

    getSpecies(): void {

        this.speciesService.callAPI(this.thisPg).subscribe(
            species => {
                this.species   = Object.values(species['results']);
            })

        this.speciesService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.speciesService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.speciesService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.speciesService.callAPI(this.thisPg).subscribe(
            species => {
                this.species = Object.values(species['results']);
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
        this.speciesService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.speciesService.callAPI(this.thisPg).subscribe(
            species => {
                this.species = Object.values(species['results']);
            });
    }

    getSpeciesDetail(number :number): void {
        console.log('CLICKED A SPECIES');
    console.log(number);
    this.speciesService.getSpeciesDetails(number).subscribe(details => this.details = Object(details));
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
