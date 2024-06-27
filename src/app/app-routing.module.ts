import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductComponent } from './components/allproduct/allproduct.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotFoundComponent } from './components/pagenot-found/pagenot-found.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { PaypalComponent } from './components/paypal/paypal.component';

const routes: Routes = [
  {
    path:'', component:AllproductComponent
  },
  {
    path:'view/:id', component:ViewProductComponent
  },
  {
    path:'user/login', component:LoginComponent
  },
  {
    path:'user/register', component:RegisterComponent
  },
  {
    path:'user/cart', component:CartComponent
  },
  {
    path:'user/wishlist', component:WishlistComponent
  },
  {
    path:'user/payment', component:PaypalComponent
  },
  
  {
    path:'**', component:PagenotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
