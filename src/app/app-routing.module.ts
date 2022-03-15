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
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      {path: 'home', component: HomePageComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: 'dashboard', component: DashboardComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
