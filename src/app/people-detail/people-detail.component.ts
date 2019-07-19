
import { Component, OnInit, Input } from '@angular/core';

import {PeopleService} from "../people.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: [ './people-detail.component.css' ]
})
export class PeopleDetailComponent implements OnInit {
    @Input()

    peoples: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private peopleService: PeopleService,
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/people/';
        this.prevPg = '';
        this.nextPg = '';
        this.getPeople();
    }

    getPeople(): void {

        this.peopleService.callAPI(this.thisPg).subscribe(
            peoples => {
                this.peoples   = Object.values(peoples['results']);
            })

        this.peopleService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.peopleService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.peopleService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.peopleService.callAPI(this.thisPg).subscribe(
            peoples => {
                this.peoples = Object.values(peoples['results']);
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
        this.peopleService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.peopleService.callAPI(this.thisPg).subscribe(
            peoples => {
                this.peoples = Object.values(peoples['results']);
            });
    }

    getPeopleDetail(number :number): void {
        console.log('CLICKED A PERSON');
        console.log(number);
        this.peopleService.getPeopleDetails(number).subscribe(details => this.details = Object(details));
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
