import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PlanetService {

  private planetsUrl = 'api/planets';  // URL to web api
   API_URL: string = "https://swapi.co/api/";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET planets from the server */

  getPlanets(thisPg: any): Observable<string[]> {
    return this.http.get<any[]>(thisPg);
  }

  getNextPlanets(thisPg: any): Observable<string[]>
  {
    return this.http.get<any[]>(thisPg);
  }

  getNextPg(nextPg: any): Observable<string[]>{
        return this.http.get<any[]>(nextPg);
      }

  getPrevPlanets(thisPg: any): Observable<string[]>
  {
    return this.http.get<any[]>(thisPg);
  }

  getPrevPg(prevPg: any): Observable<string[]>{
        return this.http.get<any[]>(prevPg);
      }

  callAPI(thisURL: any): Observable<any[]>
  {
    return this.http.get<any[]>(thisURL);
  }

  getPlanetDetails(planetIndex : number): any {
        console.log("planetIndex: "+planetIndex);
        return this.http.get<any>("https://swapi.co/api/planets/"+(planetIndex));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
