import { Injectable } from '@angular/core';
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
   constructor(private messageService: MessageService) { }
   
   // method to return the mock heroes. It returns an array of Heroes. This returns an Observable for an asynchronous function signature and the of() function imported from the RxJS library.
   // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
   getHeroes(): Observable<Hero[]> {
      // sends a message after fetching the heroes
      this.messageService.add('HeroService: fetched heroes');
      return of(HEROES);
   }
   
   // this method has an asynchronous signature. The hero is returned as an Observable using RxJs of() function.
   getHero(id: number): Observable<Hero> {
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(HEROES.find(hero => hero.id === id));
   }
}
