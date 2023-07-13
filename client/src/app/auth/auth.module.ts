import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NoAuthGuard } from '../core/guards/no-auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [AuthRoutingModule, SharedModule],
  exports: [AuthComponent],
  declarations: [AuthComponent],
})
export class AuthModule {}
