import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  UsersListPageComponent
} from "./users-list-page/users-list-page.component";
import {UserFormComponent} from "./user-form/user-form.component";

const routes: Routes = [
  { path: '', component: UsersListPageComponent  },
  // { path: '/new', component: UsersListPageComponent  },
  { path: ':id', component: UserFormComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
