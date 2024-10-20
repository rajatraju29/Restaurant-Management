import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { RestaurantdashComponent } from '../restaurantdash/restaurantdash.component';
import { MaterialComponent } from '../material/material.component';
import { AuthGuard } from '../share/auth.guard';

export const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
 // {path:'**', redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'restaurant', component:RestaurantdashComponent,canActivate:[AuthGuard]},
  {path:'material', component:MaterialComponent},
  // { path: 'about-us', component: AboutUsComponent  },
  // { path: 'contact-us', component: ContactUsComponent },
];
