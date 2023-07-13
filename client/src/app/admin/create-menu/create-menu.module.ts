import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateMenuComponent } from './create-menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CreateMenuComponent }])
  ],
  exports: [CreateMenuComponent],
  declarations: [CreateMenuComponent],
})
export class CreateMenuModule {}
