import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

// The DashboardComponent class defines a heroes array property,
export class DashboardComponent implements OnInit {
   heroes: Hero[] = [];

   // the constructor expects Angular to inject the HeroService into a private heroService property.
   constructor(private heroService: HeroService) { }

   ngOnInit() { 
      this.getHeroes();
   }

   // reduces the number of heroes displayed to four (2nd, 3rd, 4th, and 5th).
   getHeroes(): void {
      this.heroService.getHeroes()
         .subscribe(heroes => this.heroes = heroes.slice(1,5));
   }
}
