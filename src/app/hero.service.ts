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
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
   API_URL: string = "https://swapi.co/api/";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
      getCategories(): Observable<string[]> {
    return this.http.get<any[]>
      // ('https://swapi.co/api/?format=json');
    (this.API_URL + '?format=json');
  }

  getCharacters(thisPg: any): Observable<string[]> {
    return this.http.get<any[]>(thisPg);
//    (this.API_URL +'people' + '/?format=json');
  }

  getNextCharacter(thisPg: any): Observable<string[]>
  {
    return this.http.get<any[]>(thisPg);
  }

  getNextPg(nextPg: any): Observable<string[]>{
    // console.log('(SVC) next page');
    return this.http.get<any[]>(nextPg);
    //('https://swapi.co/api/people/?page=2');
  }

  getPrevCharacter(thisPg: any): Observable<string[]>
  {
    return this.http.get<any[]>(thisPg);
  }

  getPrevPg(prevPg: any): Observable<string[]>{
    // console.log('(SVC) prev page');
    return this.http.get<any[]>(prevPg);
    //('https://swapi.co/api/people/?page=2');
  }

  callAPI(thisURL: any): Observable<any[]>
  {
    return this.http.get<any[]>(thisURL);
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  getCharacterDetails(charIndex : number): any {
        console.log("charIndex: "+charIndex);
        return this.http.get<any>("https://swapi.co/api/people/"+charIndex);
  }

  getCharacterDetails2digit(charIndex : number  , charIndex2: string): any {
    console.log("charIndex: "+charIndex + charIndex2);
    return this.http.get<any>("https://swapi.co/api/people/"+charIndex+charIndex2);
  }


  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategory(cat: string) : Observable<any> {
    const url = `${this.API_URL}${cat}`;
  return this.http.get<any>(url + '/'+'?format=json').pipe
  (tap(_ => this.log('fetched category id=${cat}')), catchError(this.handleError<any>(`getCategory category=${cat}`))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
