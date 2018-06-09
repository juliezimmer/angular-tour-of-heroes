import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// received dependency injection from hero.service.ts
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
   heroes: Hero[];

   // the constructor is the injection site of the HeroService
   constructor(private heroService: HeroService) { }

   ngOnInit() {
      this.getHeroes();
   }
   
   getHeroes(): void {
      this.heroService.getHeroes()
         // subscribe passes the emitted array to the callback, wich sets the component's heroes property.
         .subscribe(heroes => this.heroes = heroes);
   }

   // add a Hero
   add(name: string): void {
      name = name.trim();
      if (!name) { return };
      this.heroService.addHero({ name } as Hero)
         .subscribe(hero => {
            this.heroes.push(hero);
      });
   }

   // deletes a hero
   delete(hero:Hero): void {
      this.heroes = this.heroes.filter (h => h !== hero);
      this.heroService.deleteHero(hero).subscribe();
   }

}
