import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {
  UsersListPageComponent
} from "./users-list-page/users-list-page.component";
import {UserFormComponent} from "./user-form/user-form.component";

@NgModule({
  declarations: [
    UsersListPageComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
