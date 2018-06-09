import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// an Angular service for interacting with the browser.
import { Location } from '@angular/common';

import { Hero } from '../hero';

// gets data from the remote server and this component uses it to get the hero-to-display
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
   @Input() hero: Hero;

   // ActivatedRoute, HeroService, and Location services are injected into the constructor with values saved in private fields.
   constructor(
      // ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
      private route: ActivatedRoute, 
      private heroService: HeroService, 
      private location: Location
   ) { }

   ngOnInit(): void {
      this.getHero();
   }

   getHero(): void {
      // 'route.snapshot' is a static image of the route information shortly after the coponent was created.
      // 'paramMap' is a dictionary of route parameter values extracted from the URL.
      // The 'id' key returns the id of the hero to fetch.
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id)
         .subscribe(hero => this.hero = hero);
   }

   goBack(): void {
      this.location.back();
   }

   // this saves hero name changes using the hero service updateHero() method.
   save(): void {
      this.heroService.updateHero(this.hero)
         .subscribe(() => this.goBack());
   }

}
