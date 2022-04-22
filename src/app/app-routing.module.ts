import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import {SiteLayoutComponent}
//   from "./shared/layouts/site-layout/site-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
