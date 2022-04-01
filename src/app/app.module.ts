import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {
  AuthLayoutComponent
} from './shared/layouts/auth-layout/auth-layout.component';
import {
  SiteLayoutComponent
} from './shared/layouts/site-layout/site-layout.component';
import {
  RegistrationPageComponent
} from './registration-page/registration-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {UsersPageComponent} from './users-page/users-page.component';
import {HttpUsersService} from "./shared/users/http-users.service";
import { UserFormComponent } from './users-page/user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegistrationPageComponent,
    HomePageComponent,
    UsersPageComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpUsersService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
