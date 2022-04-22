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

import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HomePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    UsersModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
