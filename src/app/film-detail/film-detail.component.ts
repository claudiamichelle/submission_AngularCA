import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FilmService} from "../film.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: [ './film-detail.component.css' ]
})

export class FilmDetailComponent implements OnInit {
    @Input()

    films: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private filmService: FilmService,
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/films/';
        this.prevPg = '';
        this.nextPg = '';
        this.getFilms();
    }

    getFilms(): void {

        this.filmService.callAPI(this.thisPg).subscribe(
            films => {
                this.films   = Object.values(films['results']);
            })

        this.filmService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.filmService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.filmService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.filmService.callAPI(this.thisPg).subscribe(
            films => {
                this.films = Object.values(films['results']);
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
        this.filmService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.filmService.callAPI(this.thisPg).subscribe(
            films => {
                this.films = Object.values(films['results']);
            });
    }

    getFilmDetail(number :number): void {
        console.log('CLICKED A FILM');
        console.log(number);
        this.filmService.getFilmDetails(number).subscribe(details => this.details = Object(details));
}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
