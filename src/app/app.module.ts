import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartComponent } from './cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './AdminDashboard/admin/admin.component';
import { DashboardComponent } from './AdminDashboard/dashboard/dashboard.component';
import { CategoriesAdminComponent } from './AdminDashboard/categories-admin/categories-admin.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ClientsComponent } from './AdminDashboard/clients/clients.component';
import { ProfileAdminComponent } from './AdminDashboard/profile-admin/profile-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopGridComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    NavigatorComponent,
    ContactComponent,
    SingleProductComponent,
    NewOffersComponent,
    AboutComponent,
    ProfileComponent,
    CartComponent,
    CheckoutComponent,
    AdminComponent,
    DashboardComponent,
    CategoriesAdminComponent,
    ClientsComponent,
    ProfileAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RegisterComponent,
    SingleProductComponent,
    NewOffersComponent,
    LoginComponent,
    NavigatorComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent
  ]

})
export class AppModule { }