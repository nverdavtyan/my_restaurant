import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateRestaurantComponent } from './create-restaurant.component';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CreateRestaurantComponent }]),
    GooglePlaceModule
  ],
  exports: [CreateRestaurantComponent],
  declarations: [CreateRestaurantComponent],
})
export class CreateRestaurantModule {}
