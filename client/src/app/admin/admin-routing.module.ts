import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'my-restaurant',
        loadChildren: () =>
          import('./create-restaurant/create-restaurant.module').then(
            (m) => m.CreateRestaurantModule
          ),
      },
      {
        path: 'create-dish',
        loadChildren: () =>
          import('./create-dish/create-dish.module').then(
            (m) => m.CreateDishModule
          ),
      },
      {
        path: 'create-section',
        loadChildren: () =>
          import('./create-section/create-section.module').then(
            (m) => m.CreateMenuModule
          ),
      },
      {
        path: 'drag-drop',
        loadChildren: () =>
          import('./drag-drop/drag-drop.module').then((m) => m.DragdropModule),
      },
      
      {
        path: 'create-menu',
        loadChildren: () =>
          import('./create-menu/create-menu.module').then(
            (m) => m.CreateMenuModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
