import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { NoAuthGuard } from '../core/guards/no-auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: RestaurantListComponent },
      {
        path: '',
        loadChildren: () =>
          import('../restaurant-list/restaurant-list.module').then(
            (m) => m.RestaurantListModule
          ),
      },
      {
        path: 'restaurant-detail/:id',
        loadChildren: () =>
          import('../restaurant-details/restaurant-details.module').then(
            (m) => m.RestaurantDetailsModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../register/register.module').then((m) => m.RegisterModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [NoAuthGuard],
      },

      { path: 'page-not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
