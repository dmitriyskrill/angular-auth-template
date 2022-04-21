import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {
  SiteLayoutComponent
} from './shared/layouts/site-layout/site-layout.component';

import {HomePageComponent} from './home-page/home-page.component';
import {HttpUsersService} from "./shared/users/http-users.service";
import {UsersPageComponent} from './users-page/users-page.component';

import {UserFormComponent} from './users-page/user-form/user-form.component';
import {AuthModule} from "./auth/auth.module";


@NgModule({
  declarations: [
    AppComponent,

    SiteLayoutComponent,

    HomePageComponent,
    UsersPageComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    HttpUsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
