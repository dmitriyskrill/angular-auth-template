import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent}
  from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent}
  from "./shared/layouts/site-layout/site-layout.component";
import {RegistrationPageComponent}
  from "./registration-page/registration-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {UsersPageComponent} from "./users-page/users-page.component";
import {UserFormComponent} from "./users-page/user-form/user-form.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      {path: 'home', component: HomePageComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'user/new', component: UserFormComponent},
      {path: 'user/:id', component: UserFormComponent}
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
