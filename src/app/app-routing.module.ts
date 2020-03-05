import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CarouselComponent } from './carousel/carousel.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'car', component: CarouselComponent },
  {path: 'account', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
