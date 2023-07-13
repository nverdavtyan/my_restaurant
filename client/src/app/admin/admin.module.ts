import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NoAuthGuard } from '../core/guards/no-auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [AdminRoutingModule, SharedModule, DragDropModule],
  exports: [AdminComponent],
  declarations: [AdminComponent],
})
export class AdminModule {}
