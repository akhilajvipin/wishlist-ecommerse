import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllproductComponent } from './components/allproduct/allproduct.component';
import { PagenotFoundComponent } from './components/pagenot-found/pagenot-found.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { PaypalComponent } from './components/paypal/paypal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    WishlistComponent,
    AllproductComponent,
    PagenotFoundComponent,
    ViewProductComponent,
    FilterPipe,
    PaypalComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
