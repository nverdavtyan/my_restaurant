import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [SharedModule, LayoutRoutingModule, MatIconModule],
  exports: [LayoutComponent, HomeComponent, HeaderComponent, FooterComponent],
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutModule {}
