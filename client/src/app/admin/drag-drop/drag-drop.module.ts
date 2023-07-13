import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DragDropComponent } from './drag-drop.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DragDropComponent }]),
    DragDropModule,
  ],
  exports: [DragDropComponent],
  declarations: [DragDropComponent],
})
export class DragdropModule {}
