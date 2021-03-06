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
import { ClientsComponent } from './AdminDashboard/clients/clients.component';
import { ProfileAdminComponent } from './AdminDashboard/profile-admin/profile-admin.component';
import { ProductsAdminComponent } from './AdminDashboard/products-admin/products-admin.component';
import { SingleProdAdminComponent } from './AdminDashboard/single-prod-admin/single-prod-admin.component';
import { OrdersAdminComponent } from './AdminDashboard/orders-admin/orders-admin.component';
import { MessagesAdminComponent } from './AdminDashboard/messages-admin/messages-admin.component';
import { LoginAdminComponent } from './AdminDashboard/login-admin/login-admin.component';
import { AuthGuard } from './shared/auth.guard.service';

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
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'categoriesAdmin', component: CategoriesAdminComponent, canActivate: [AuthGuard] },
  { path: 'clientsAdmin', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'profileAdmin/:id', component: ProfileAdminComponent, canActivate: [AuthGuard] },
  { path: 'productsAdmin', component: ProductsAdminComponent, canActivate: [AuthGuard] },
  { path: 'singleProductAdmin/:id', component: SingleProdAdminComponent, canActivate: [AuthGuard] },
  { path: 'ordersAdmin', component: OrdersAdminComponent , canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesAdminComponent, canActivate: [AuthGuard] },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// {onSameUrlNavigation: 'reload'}
export class AppRoutingModule { }

