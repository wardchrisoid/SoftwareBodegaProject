import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AboutComponent } from '../about/about.component';
import { FridgeComponent } from '../fridge/fridge.component';
import { CartComponent } from '../cart/cart.component';
import { VendorComponent } from '../vendor/vendor.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'vendor',
  component: VendorComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'fridge',
  component: FridgeComponent
},
{
  path: 'cart',
  component: CartComponent
}    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
