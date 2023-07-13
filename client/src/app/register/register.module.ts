import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  imports: [RegisterRoutingModule, SharedModule],
  exports: [RegisterComponent],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
