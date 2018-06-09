import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import { MessageService } from './message.service';

// Hero class from hero.ts
import { Hero } from './hero';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

// dependency injection decorator
@Injectable({
  providedIn: 'root'
})
export class HeroService {
   private heroesUrl = 'api/heroes'; // URL to web api 
   
   constructor(
      private http: HttpClient,
      private messageService: MessageService) { }
   
   private log(message: string) {
      this.messageService.add("HeroService: " + message);
   }

   getHeroes(): Observable<Hero[]> {
      // HttpClient.get returns response data, a single hero array.
      return this.http.get<Hero[]>(this.heroesUrl)
         .pipe(
            tap(heroes => this.log('fetched heroes'))
            // catchError(this.handleError('getHeroes', []))
         );
   }
   
   // this method gets a hero by the id. 
   // If the hero id is not found, a 404 message is given. 
   // Returns an Observable<Hero> , an observable of Hero objects instead of an observable of hero arrays.
   getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http
         .get<Hero>(url)
            .pipe(tap(_ => this.log(`fetched hero id=${id}`)),
            );
   }

   // updates hero changes 
   updateHero (hero: Hero): Observable<any> {
      return this.http  
         .put(this.heroesUrl, hero, httpOptions)
            .pipe(tap(_ => this.log(`updated hero id=${hero.id}`))
      );
   }

   // Adds a hero - HTTP Post request
   addHero (hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
         .pipe(tap((hero:Hero) => this.log(`added hero with id=${hero.id}`))
         );
   }

   // Deletes a hero
   deleteHero (hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`;

      return this.http.delete<Hero>(url, httpOptions)
         .pipe(tap(_ => this.log(`deleted hero id=${id}`))
         );
   }

   // search heroes by name
   searchHeroes(term: string): Observable<Hero[]> { 
      if (!term.trim()) {
         // if no match, return empay hero array
         return of ([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
         .pipe(tap(_ => this.log(`found heroes matching "${term}"`))
      );
   }
}
