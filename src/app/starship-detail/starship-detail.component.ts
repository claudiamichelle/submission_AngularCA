import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {StarshipService} from "../starship.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: [ './starship-detail.component.css' ]
})
export class StarshipDetailComponent implements OnInit {
    @Input()

    starships: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private starshipService: StarshipService,
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/starships/';
        this.prevPg = '';
        this.nextPg = '';
        this.getStarships();
    }

    getStarships(): void {

        this.starshipService.callAPI(this.thisPg).subscribe(
            starships => {
                this.starships = Object.values(starships['results']);
            })

        this.starshipService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.starshipService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.starshipService.callAPI(this.nextPg).subscribe(
        nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.starshipService.callAPI(this.thisPg).subscribe(
        starships => {
                this.starships = Object.values(starships['results']);
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
        this.starshipService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.starshipService.callAPI(this.thisPg).subscribe(
            starships => {
                this.starships = Object.values(starships['results']);
            });
    }

    getStarshipDetail(number :number): void {
        console.log('CLICKED A STARSHIP');
        console.log(number);
        this.starshipService.getStarshipDetails(number).subscribe(details => this.details = Object(details));
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
