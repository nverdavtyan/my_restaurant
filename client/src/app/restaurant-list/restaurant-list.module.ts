import { NgModule } from '@angular/core';

import { RestaurantListComponent } from './restaurant-list.component';
import { RestaurantsListRoutingModule } from './restaurant-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [RestaurantsListRoutingModule, SharedModule],
  exports: [RestaurantListComponent],
  declarations: [RestaurantListComponent],
})
export class RestaurantListModule {}
