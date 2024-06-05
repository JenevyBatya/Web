import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TotallyNothingComponent } from './components/totally-nothing/totally-nothing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StarterComponent } from './components/starter/starter.component';
import { GuardService } from './service/guard.service';

const routes: Routes = [
  {
    path: 'main',
    component: HomeComponent,
    canActivate: [GuardService],
    title: 'Home'
  },
  {
    path: 'starter',
    component: StarterComponent
  },
  {
    path: 'test',
    component: TotallyNothingComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
