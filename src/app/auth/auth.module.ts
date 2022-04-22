import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {
  AuthLayoutComponent
} from './layout/auth-layout.component';
import {
  RegistrationPageComponent
} from './registration-page/registration-page.component';
import {TokenInterceptor} from "./classes/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {
}
