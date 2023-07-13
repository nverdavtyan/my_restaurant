import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateDishComponent } from './create-dish.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CreateDishComponent }]),
  ],
  exports: [CreateDishComponent],
  declarations: [CreateDishComponent],
})
export class CreateDishModule {}
