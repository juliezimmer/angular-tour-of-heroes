import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// this component is referenced in a route, so therefore must be imported.
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// routes is of type Routes
const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
   { path: 'dashboard', component: DashboardComponent },
   { path: 'detail/:id', component: HeroDetailComponent },
   { path: 'heroes', component: HeroesComponent }
]

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})

export class AppRoutingModule { }
