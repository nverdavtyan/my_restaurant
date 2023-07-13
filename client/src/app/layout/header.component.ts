import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => (this.isAuthenticated = loggedIn)
    );

    console.log(this.isAuthenticated);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
