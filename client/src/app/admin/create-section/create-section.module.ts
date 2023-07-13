import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateSectionComponent } from './create-section.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CreateSectionComponent }]),
  ],
  exports: [CreateSectionComponent],
  declarations: [CreateSectionComponent],
})
export class CreateMenuModule {}
