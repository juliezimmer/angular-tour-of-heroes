import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';


import { MessageService } from './message.service';

// Hero class from hero.ts
import { Hero } from './hero';
// array of heroes data
import { HEROES } from './mock-heroes';

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

   

   // This method returns the heroes from the mock DB as an array of Heroes. 
   // An Observable is returned to give the method an asynchronous signature.
   // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
   getHeroes(): Observable<Hero[]> {
      // HttpClient.get returns response data, a single hero array.
      return this.http.get<Hero[]>(this.heroesUrl)
      
   }
   
   // this method has an asynchronous signature. The hero is returned as an Observable using RxJs of() function.
   getHero(id: number): Observable<Hero> {
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      
   }
}
