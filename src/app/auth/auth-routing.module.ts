import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent}
  from "./layout/auth-layout.component";

import {RegistrationPageComponent}
  from "./registration-page/registration-page.component";


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  // {
  //   path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      // {path: 'passwordRecovery', component: }
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)], //TODO №14 Для чего тут forRoot
  exports: [RouterModule]
})
export class AppRoutingModule {
}
