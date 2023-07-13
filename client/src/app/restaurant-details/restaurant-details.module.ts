import { NgModule } from '@angular/core';

import { RestaurantDetailsComponent } from './restaurant-details.component';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    RestaurantDetailsRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MatIconModule,
  ],
  exports: [RestaurantDetailsComponent],
  declarations: [RestaurantDetailsComponent],
})
export class RestaurantDetailsModule {}
