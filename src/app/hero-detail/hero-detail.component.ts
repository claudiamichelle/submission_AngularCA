import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import {getPluralCategory} from "@angular/common/src/i18n/localization";
import {forEach} from "@angular/router/src/utils/collection";
import {stringify} from "@angular/core/src/render3/util";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    cat: any;
    characters: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    charIndex: number;
    charIndex2: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/people/';
        this.prevPg = 'abcde';
        this.nextPg = '12345';
        this.getCharacters();
    }

    getCharacters(): void {

        this.heroService.callAPI(this.thisPg).subscribe(
            characters => {
                this.characters = Object.values(characters['results']);
            })

        this.heroService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.heroService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');

        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.heroService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.heroService.callAPI(this.thisPg).subscribe(
            characters => {
                this.characters = Object.values(characters['results']);
            });
    }

    previousPage(): void {

        if (this.prevPg = "")
        {
            console.log("This is the first page.");
            return;
        }

        console.log('CLICKED PREVIOUS');

        this.nextPg = this.thisPg;
        this.thisPg = this.prevPg;
        this.heroService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.heroService.callAPI(this.thisPg).subscribe(
            characters => {
                this.characters = Object.values(characters['results']);
            });
    }

    getCharDetail(number :number): void {
        console.log('CLICKED A CHARACTER');
    console.log(number);
    this.heroService.getCharacterDetails(number).subscribe(details => this.details = Object(details));
    console.log("testing ello")}

        getCharDetail2digit(number :number, number2: string): void {
            console.log('CLICKED A CHARACTER');
        console.log(number,number2);
        this.heroService.getCharacterDetails2digit(number,number2).subscribe(details => this.details = Object(details));
        console.log("testing ello")
}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
