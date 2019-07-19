import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {VehicleService} from "../vehicle.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: [ './vehicle-detail.component.css' ]
})
export class VehicleDetailComponent implements OnInit {
    @Input()

    vehicles: any[];
    nextPg: string;
    thisPg: string;
    prevPg: string;
    details: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleService: VehicleService,
    ){}

    ngOnInit(): void {
        this.thisPg = 'https://swapi.co/api/vehicles/';
        this.prevPg = 'abcde';
        this.nextPg = '12345';
        this.getVehicles();
    }

    getVehicles(): void {

        this.vehicleService.callAPI(this.thisPg).subscribe(
            vehicles => {
                this.vehicles = Object.values(vehicles['results']);
            });

        this.vehicleService.callAPI(this.thisPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        this.vehicleService.callAPI(this.thisPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});

        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

    }

    nextPage(): void {
        console.log('CLICKED NEXT');
        this.prevPg = this.thisPg;
        this.thisPg = this.nextPg;
        this.vehicleService.callAPI(this.nextPg).subscribe(
            nextPg => {this.nextPg = Object.values(nextPg['next']).join("");});


        console.log('Current Pg : ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.vehicleService.callAPI(this.thisPg).subscribe(
            vehicles => {
                this.vehicles = Object.values(vehicles['results']);
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
        this.vehicleService.callAPI(this.prevPg).subscribe(
            prevPg => {this.prevPg = Object.values(prevPg['previous']).join("");});

        console.log('Current Pg: ' + this.thisPg);
        console.log('Previous Pg: ' + this.prevPg);
        console.log('Next Pg: ' + this.nextPg);

        this.vehicleService.callAPI(this.thisPg).subscribe(
            vehicles => {
                this.vehicles = Object.values(vehicles['results']);
            });
    }

    getVehicleDetail(number :number): void {
        console.log('CLICKED A VEHICLE');
        console.log(number);
        this.vehicleService.getVehicleDetails(number).subscribe(details => this.details = Object(details));
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
