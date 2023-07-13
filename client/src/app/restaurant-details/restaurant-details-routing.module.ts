import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantDetailsComponent } from './restaurant-details.component';

const routes: Routes = [{ path: '', component: RestaurantDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantDetailsRoutingModule {}
