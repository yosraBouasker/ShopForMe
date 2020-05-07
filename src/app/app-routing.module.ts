import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './AdminDashboard/dashboard/dashboard.component';
import { CategoriesAdminComponent } from './AdminDashboard/categories-admin/categories-admin.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopGridComponent },
  { path: 'shop/:id', component: ShopGridComponent },
  { path: 'contactUs', component: ContactComponent },
  { path: 'aboutUs', component: AboutComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'categoriesAdmin', component: CategoriesAdminComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// {onSameUrlNavigation: 'reload'}
export class AppRoutingModule { }
